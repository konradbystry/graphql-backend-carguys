const { model, Schema } = require("mongoose");

const chatSchema = {
  date: String,
  userId: Schema.Types.ObjectId,
  secondUserId: Schema.Types.ObjectId,
};

module.exports = model("Chat", chatSchema);
