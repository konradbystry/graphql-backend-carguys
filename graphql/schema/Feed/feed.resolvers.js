require("dotenv").config();

const Feed = require("../../../models/Feed");
const mongoose = require("mongoose");
const { PubSub } = require("graphql-subscriptions");
const date = require("date-and-time");
const cloudinary = require("cloudinary").v2;

const pubsub = new PubSub();

module.exports = {
  Query: {
    async getFeed() {
      return await Feed.find();
    },
  },
  Mutation: {
    async createFeed(_, { feedInput: { title, text, image } }) {
      const now = new Date();

      if (image !== "") {
        const imageCloud = await cloudinary.uploader.upload(image, {
          resource_type: "image",
        });

        const createdFeed = new Feed({
          title: title,
          text: text,
          image: imageCloud.secure_url,
          date: date.format(now, "ddd, MMM DD YYYY"),
        });

        const res = await createdFeed.save();

        return {
          id: res.id,
          ...res._doc,
        };
      }
    },
    async deleteFeed(_, { ID }) {
      return Feed.findByIdAndDelete(ID);
    },
  },
};
