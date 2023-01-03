const User = require("../../../models/User");
const Post = require("../../../models/Post");
const Topic = require("../../../models/Topic");
const mongoose = require("mongoose");
const { PubSub } = require("graphql-subscriptions");
const date = require("date-and-time");
const Favourites = require("../../../models/Favourites");

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
      return await Topic.find({ name });
    },

    async getUsersFavourites(_, { userId }) {
      const favourites = await Favourites.find({ userId });
      let favouriteTopics = [];

      favourites.forEach((favourite) => {
        var topic = Topic.findById(favourite.topicId);
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

    async deleteTopic(_, { ID }) {
      const deletedFavourites = await Favourites.deleteMany({ topicId: ID });
      return await Topic.findByIdAndDelete(ID);
    },
  },

  Subscription: {
    topicCreated: {
      subscribe: () => pubsub.asyncIterator("TOPIC_CREATED"),
    },
  },
};
