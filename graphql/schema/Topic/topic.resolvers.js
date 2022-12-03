const User = require("../../../models/User");
const Post = require("../../../models/Post");
const Topic = require("../../../models/Topic");
// const {ObjectId} = require('mongodb')
const mongoose = require("mongoose");
module.exports = {
  Query: {
    async getTopics() {
      return await Topic.find();
    },
    async getTopic(_, { ID }) {
      return await Topic.findById(ID);
    },
    async getTopicByName(_, { name }) {
      return await Topic.find({ name: name });
    },

    async getUsersFavourites(_, { userId }) {
      const user = await User.findById(userId);
      let favouriteTopics = [];

      user.favourites.forEach((topicId) => {
        var topic = Topic.findById(topicId);
        favouriteTopics.push(topic);
      });

      return await favouriteTopics;
    },
  },
  Mutation: {
    async createTopic(_, { topicInput: { name, ownerId } }) {
      const createdTopic = new Topic({
        name: name,
        posts: [],
        premium: 0,
        ownerId: ownerId,
      });

      const res = await createdTopic.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
