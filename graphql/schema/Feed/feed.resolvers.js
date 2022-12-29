const User = require("../../../models/User");
const Post = require("../../../models/Post");
const Topic = require("../../../models/Topic");
const Feed = require("../../../models/Feed");
const mongoose = require("mongoose");
const { PubSub } = require("graphql-subscriptions");
const date = require("date-and-time");

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
      const createdFeed = new Feed({
        title: title,
        text: text,
        image: image,
        date: date.format(now, "ddd, MMM DD YYYY"),
      });

      const res = await createdFeed.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
