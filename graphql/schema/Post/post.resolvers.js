require("dotenv").config();

const User = require("../../../models/User");
const Post = require("../../../models/Post");
const Topic = require("../../../models/Topic");
const date = require("date-and-time");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { PubSub } = require("graphql-subscriptions");
const { ApolloError } = require("apollo-server-errors");
const pubsub = new PubSub();

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
    async createPost(
      _,
      { postInput: { text, userId, userName, topicId, image } }
    ) {
      const now = new Date();

      if (text === "") {
        throw new ApolloError(
          "This post is a bit empty, please write something to post!",
          "EMPTY_MESSAGE"
        );
      }

      if (image !== "") {
        const imageCloud = await cloudinary.uploader.upload(image, {
          resource_type: "image",
        });

        const createdPost = new Post({
          text: text,
          userId: userId,
          userName: userName,
          topicId: topicId,
          date: date.format(now, "ddd, MMM DD YYYY"),
          image: imageCloud.secure_url,
          likes: 0,
          likedBy: [],
        });

        const res = await createdPost.save();

        pubsub.publish("POST_CREATED", {
          postCreated: {
            text: text,
            userId: userId,
            userName: userName,
            topicId: topicId,
            date: date.format(now, "ddd, MMM DD YYYY"),
            image: imageCloud.secure_url,
            likes: 0,
            likedBy: [],
          },
        });

        return {
          id: res.id,
          ...res._doc,
        };
      }

      const createdPost = new Post({
        text: text,
        userId: userId,
        userName: userName,
        topicId: topicId,
        date: date.format(now, "ddd, MMM DD YYYY"),
        image: image,
        likes: 0,
        likedBy: [],
      });

      const res = await createdPost.save();

      pubsub.publish("POST_CREATED", {
        postCreated: {
          text: text,
          userId: userId,
          userName: userName,
          topicId: topicId,
          date: date.format(now, "ddd, MMM DD YYYY"),
          image: image,
          likes: 0,
          likedBy: [],
        },
      });

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deletePost(_, { ID }) {
      return Post.findByIdAndDelete(ID);
    },

    async likePost(_, { postId, userId }) {
      const post = await Post.findById(postId);
      if (post.likes === undefined) {
        post.likes = 0;
      }
      post.likes += 1;
      post.likedBy.push(userId);

      res = await post.save();

      pubsub.publish("POST_LIKED", {
        postLiked: {
          likes: post.likes,
          likedBy: post.likedBy,
        },
      });

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },

  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator("POST_CREATED"),
    },
    postLiked: {
      subscribe: () => pubsub.asyncIterator("POST_LIKED"),
    },
  },
};
