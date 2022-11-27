const { model, Schema } = require("mongoose");

const messageSchema = {
  chatId: Schema.Types.ObjectId,
  date: String,
  text: String,
  image: String,
  userName: String,
  userId: Schema.Types.ObjectId,
};

module.exports = model("Message", messageSchema);
