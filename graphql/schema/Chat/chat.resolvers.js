const Chat = require("../../../models/Chat");
const mongoose = require("mongoose");

module.exports = {
  Query: {
    async getChats(_, { userId }) {
      console.log(userId);

      const firstChatUser = await Chat.find({ userId });

      if (firstChatUser.length === 0) {
        const secondChatUser = await Chat.find({ secondUserId: userId });
        return secondChatUser;
      }

      return firstChatUser;
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
  },

  Mutation: {
    async createChat(_, { chatInput: { userId, secondUserId } }) {
      const newChat = new Chat({
        userId: userId,
        secondUserId: secondUserId,
      });
      const res = await newChat.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
