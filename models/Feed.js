const { model, Schema } = require("mongoose");

const feedSchema = {
  date: String,
  title: String,
  text: String,
  image: String,
};

module.exports = model("Feed", feedSchema);
