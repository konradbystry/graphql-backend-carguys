const Chat = require("../../../models/Chat");
const mongoose = require("mongoose");
const date = require("date-and-time");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

module.exports = {
  Query: {
    async getChats(_, { userId }) {
      // console.log(userId);

      // const firstChatUser = await Chat.find({ userId });

      // if (firstChatUser.length === 0) {
      //   const secondChatUser = await Chat.find({ secondUserId: userId });
      //   return secondChatUser;
      // }

      return await Chat.find({
        $or: [{ userId: userId }, { secondUserId: userId }],
      });
    },

    async isAlreadyChatting(_, { userId, secondUserId }) {
      const firstCheck = await Chat.findOne({
        userId: userId,
        secondUserId: secondUserId,
      });
      console.log(firstCheck);
      if (firstCheck === null) {
        const secondCheck = await Chat.findOne({
          userId: secondUserId,
          secondUserId: userId,
        });

        return secondCheck;
      }

      return firstCheck;
    },

    async getChat(_, { ID }) {
      return await Chat.findById(ID);
    },
  },

  Mutation: {
    async createChat(
      _,
      { createChat: { userId, secondUserId, initMessage, initUserId } }
    ) {
      const now = new Date();

      const newChat = new Chat({
        userId: userId,
        secondUserId: secondUserId,
        initMessage: initMessage,
        initUserId: initUserId,
        initDate: date.format(now, "ddd, MMM DD YYYY"),
      });
      const res = await newChat.save();

      pubsub.publish("CHAT_CREATED", {
        chatCreated: {
          userId: userId,
          secondUserId: secondUserId,
          initMessage: initMessage,
          initUserId: initUserId,
          initDate: date.format(now, "ddd, MMM DD YYYY"),
        },
      });

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },

  Subscription: {
    chatCreated: {
      subscribe: () => pubsub.asyncIterator("CHAT_CREATED"),
    },
  },
};
