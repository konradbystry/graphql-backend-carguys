const User = require("../../../models/User");
const Message = require("../../../models/Message");
const date = require("date-and-time");
// const {ObjectId} = require('mongodb')
const mongoose = require("mongoose");
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
      const now = new Date();

      const newMessage = new Message({
        text: text,
        userId: userId,
        userName: userName,
        chatId: chatId,
        date: date.format(now, "ddd, MMM DD YYYY"),
        image: "",
      });

      const res = await newMessage.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
