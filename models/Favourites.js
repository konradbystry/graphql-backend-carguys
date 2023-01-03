const { model, Schema } = require("mongoose");

const favouritesSchema = {
  userId: Schema.Types.ObjectId,
  topicId: Schema.Types.ObjectId,
};

module.exports = model("Favourites", favouritesSchema);
