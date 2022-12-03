const { model, Schema } = require("mongoose");

const topicSchema = new Schema({
  name: String,
  posts: [Schema.Types.ObjectId],
  premium: Boolean,
  ownerId: Schema.Types.ObjectId,
  ownerName: String,
  likes: Number,
});

module.exports = model("Topic", topicSchema);
