const User = require("../../../models/User");
const Message = require("../../../models/Message");
const Chat = require("../../../models/Chat");
const date = require("date-and-time");
// const {ObjectId} = require('mongodb')
const mongoose = require("mongoose");
const { ApolloError } = require("apollo-server");
module.exports = {
  Query: {
    async getMessages(_, { chatId }) {
      return await Message.find({ chatId });
    },
  },
  Mutation: {
    async createMessage(
      _,
      { messageInput: { text, userId, userName, chatId } }
    ) {
      const chat = await Chat.findById(chatId);

      if (chat === null) {
        throw new ApolloError("Chat doesn't exist");
      } else {
        const now = new Date();

        const newMessage = new Message({
          text: text,
          userId: userId,
          userName: userName,
          chatId: chatId,
          date: date.format(now, "ddd, MMM DD YYYY"),
          image: "",
        });

        chat.lastMessage = text;
        chat.date = date.format(now, "ddd, MMM DD YYYY");
        chat.save();

        const res = await newMessage.save();

        return {
          id: res.id,
          ...res._doc,
        };
      }
    },
  },
};
