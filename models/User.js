const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  nickname: String,
  email: String,
  password: String,
  posts: [Schema.Types.ObjectId],
  premium: Boolean,
  friends: [Schema.Types.ObjectId],
  cars: [Schema.Types.ObjectId],
  token: String,
  friendRequests: [Schema.Types.ObjectId],
  favourites: [Schema.Types.ObjectId],
});

module.exports = model("User", userSchema);
