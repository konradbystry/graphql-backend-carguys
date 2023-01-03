const Favourites = require("../../../models/Favourites");
const User = require("../../../models/User");
const Topic = require("../../../models/Topic");
const mongoose = require("mongoose");
const date = require("date-and-time");

module.exports = {
  Query: {
    async getFavourites(_, { userId }) {
      return await Favourites.find({ userId });
    },
  },
  Mutation: {
    async addFavourites(_, { favouritesInput: { userId, topicId } }) {
      const user = await User.findById(userId);
      const topic = await Topic.findById(topicId);

      topic.likes += 1;
      const topicLiked = await topic.save();

      user.favourites.push(topicId);
      const addedToFavourites = await user.save();

      //   pubsub.publish("USER_LIKED_TOPIC", {
      //     userLikedTopic: {
      //       likes: topic.likes,
      //     },
      //   });

      //   pubsub.publish("ADDED_TO_FAVOURITES", {
      //     addedToFavourites: {
      //       favourites: user.favourites,
      //     },
      //   });

      const newFavourites = new Favourites({
        userId: userId,
        topicId: topicId,
      });

      const res = await newFavourites.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteFavourites(_, { topicId }) {
      return await Favourites.deleteMany({ topicId });

      //words.filter(word => word !== "limit");

      //return await Favourites.deleteMany({ topicId });
    },
  },
};
