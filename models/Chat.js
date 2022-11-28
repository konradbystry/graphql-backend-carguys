const { model, Schema } = require("mongoose");

const chatSchema = {
  date: String,
  userId: Schema.Types.ObjectId,
  secondUserId: Schema.Types.ObjectId,
  initMessage: String,
  lastMessage: String,
};

module.exports = model("Chat", chatSchema);
