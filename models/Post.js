const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  userId: Schema.Types.ObjectId,
  topicId: Schema.Types.ObjectId,
  date: String,
  text: String,
  image: String,
});

module.exports = model("Post", postSchema);
