const User = require("../../../models/User");
const Post = require("../../../models/Post");
const Topic = require("../../../models/Topic");
const mongoose = require("mongoose");
const { PubSub } = require("graphql-subscriptions");
const date = require("date-and-time");

const pubsub = new PubSub();

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
    async createTopic(_, { topicInput: { name, ownerId, firstPost, banner } }) {
      const now = new Date();

      const createdTopic = new Topic({
        name: name,
        posts: [],
        premium: 0,
        ownerId: ownerId,
        likes: 0,
        firstPost: firstPost,
        banner: banner,
        date: date.format(now, "ddd, MMM DD YYYY"),
      });

      const res = await createdTopic.save();

      pubsub.publish("TOPIC_CREATED", {
        topicCreated: {
          name: name,
          posts: [],
          premium: 0,
          ownerId: ownerId,
          likes: 0,
          firstPost: firstPost,
          banner: banner,
        },
      });

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },

  Subscription: {
    topicCreated: {
      subscribe: () => pubsub.asyncIterator("TOPIC_CREATED"),
    },
  },
};
