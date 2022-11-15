const User = require("../../../models/User");
const Post = require("../../../models/Post");
const Topic = require("../../../models/Topic");
const date = require("date-and-time");
// const {ObjectId} = require('mongodb')
const mongoose = require("mongoose");
module.exports = {
  Query: {
    async getPosts(_, { topicId }) {
      return await Post.find({ topicId });
    },
    async getPost(_, { ID }) {
      return await Post.findById(ID);
    },
  },
  Mutation: {
    async createPost(_, { postInput: { text, userId, userName, topicId } }) {
      const now = new Date();

      const createdPost = new Post({
        text: text,
        userId: userId,
        userName: userName,
        topicId: topicId,
        date: date.format(now, "ddd, MMM DD YYYY"),
        image: "",
      });

      const res = await createdPost.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
