const User = require("../../../models/User");
const Post = require("../../../models/Post");
const Topic = require("../../../models/Topic");
// const {ObjectId} = require('mongodb')
const mongoose = require("mongoose");
const Banner = require("../../../models/Banner");
module.exports = {
  Query: {
    async getBanner(_, { id }) {
      return await Banner.findById(id);
    },

    async getBanners() {
      return await Banner.find();
    },
  },
  Mutation: {
    async createBanner(_, { image }) {
      const newBanner = new Banner({
        image: image,
      });

      res = await newBanner.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
