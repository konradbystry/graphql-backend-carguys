require("dotenv").config();

const User = require("../../../models/User");
const Message = require("../../../models/Message");
const Chat = require("../../../models/Chat");
const date = require("date-and-time");

const mongoose = require("mongoose");
const { ApolloError } = require("apollo-server");
const cloudinary = require("cloudinary").v2;
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

module.exports = {
  Query: {
    async getMessages(_, { chatId }) {
      return await Message.find({ chatId });
    },
  },
  Mutation: {
    async createMessage(
      _,
      { messageInput: { text, userId, userName, chatId, image } }
    ) {
      const chat = await Chat.findById(chatId);

      if (chat === null) {
        throw new ApolloError("Chat doesn't exist");
      } else {
        const now = new Date();

        if (image !== "") {
          const imageCloud = await cloudinary.uploader.upload(image, {
            resource_type: "image",
          });

          const newMessage = new Message({
            text: text,
            userId: userId,
            userName: userName,
            chatId: chatId,
            date: date.format(now, "ddd, MMM DD YYYY"),
            image: imageCloud.secure_url,
          });

          chat.lastMessage = text;
          chat.date = date.format(now, "ddd, MMM DD YYYY");
          chat.save();

          const res = await newMessage.save();

          pubsub.publish("MESSAGE_CREATED", {
            messageCreated: {
              text: text,
              userId: userId,
              userName: userName,
              chatId: chatId,
              date: date.format(now, "ddd, MMM DD YYYY"),
              image: imageCloud.secure_url,
            },
          });

          return {
            id: res.id,
            ...res._doc,
          };
        }
        const newMessage = new Message({
          text: text,
          userId: userId,
          userName: userName,
          chatId: chatId,
          date: date.format(now, "ddd, MMM DD YYYY"),
          image: image,
        });

        chat.lastMessage = text;
        chat.date = date.format(now, "ddd, MMM DD YYYY");
        chat.save();

        const res = await newMessage.save();

        pubsub.publish("MESSAGE_CREATED", {
          messageCreated: {
            text: text,
            userId: userId,
            userName: userName,
            chatId: chatId,
            date: date.format(now, "ddd, MMM DD YYYY"),
            image: image,
          },
        });

        return {
          id: res.id,
          ...res._doc,
        };
      }
    },
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator("MESSAGE_CREATED"),
    },
  },
};
