const { model, Schema } = require("mongoose");

const bannerSchema = {
  image: String,
};

module.exports = model("Banner", bannerSchema);
