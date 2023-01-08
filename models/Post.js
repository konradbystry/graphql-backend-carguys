const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  userId: Schema.Types.ObjectId,
  userName: String,
  topicId: Schema.Types.ObjectId,
  date: String,
  text: String,
  image: String,
  likes: Number,
  likedBy: [Schema.Types.ObjectId],
});

module.exports = model("Post", postSchema);
