const { model, Schema } = require("mongoose");

const topicSchema = new Schema({
  name: String,
  ownerId: Schema.Types.ObjectId,
  ownerName: String,
  likes: Number,
  firstPost: String,
  banner: String,
  date: String,
});

module.exports = model("Topic", topicSchema);
