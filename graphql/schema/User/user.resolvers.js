require("dotenv").config();

const User = require("../../../models/User");
const Topic = require("../../../models/Topic");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const lodash = require("lodash");
const cloudinary = require("cloudinary").v2;
const { PubSub } = require("graphql-subscriptions");
const date = require("date-and-time");

const pubsub = new PubSub();

module.exports = {
  Query: {
    async getUser(_, { ID }) {
      return await User.findById(ID);
    },
    async getUsers() {
      return await User.find();
    },
    async getUserByEmail(_, { email }) {
      //return await User.findOne({nickname})
      return await User.find({ email });
    },
    async getFriends(_, friends) {
      let getFriends = [];

      friends.friends.forEach((friendId) => {
        let friend = User.findById(friendId);
        getFriends.push(friend);
      });

      return await getFriends;
    },
    async getUserByNickname(_, { nickname }) {
      return await User.find({ nickname: { $regex: nickname } });
    },
  },
  Mutation: {
    async createUser(_, { userInput: { nickname, email, password } }) {
      const now = new Date();
      const encryptedPassword = await bcrypt.hash(password, 10);
      const createdUser = new User({
        nickname: nickname,
        email: email.toLowerCase(),
        password: encryptedPassword,
        banner:
          "https://res.cloudinary.com/dc6yaxeeh/image/upload/v1671388402/ohhrcvb4gp3pjhe3gypx.jpg",
        profilePicture: "",
        description: "I'm a new car guy!",
        date: date.format(now, "ddd, MMM DD YYYY"),
      });

      const res = await createdUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async createAdmin(_, { userInput: { nickname, email, password } }) {
      const now = new Date();
      const encryptedPassword = await bcrypt.hash(password, 10);
      const createdUser = new User({
        nickname: nickname,
        email: email.toLowerCase(),
        password: encryptedPassword,
        banner:
          "https://res.cloudinary.com/dc6yaxeeh/image/upload/v1671388402/ohhrcvb4gp3pjhe3gypx.jpg",
        profilePicture: "",
        description: "I'm a new car guy!",
        date: date.format(now, "ddd, MMM DD YYYY"),
        admin: true,
      });

      const res = await createdUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async editUser(
      _,
      { editInput: { id, profilePicture, banner, nickname, description } }
    ) {
      const user = await User.findById(id);

      if (
        profilePicture === "" ||
        banner === "" ||
        nickname === "" ||
        description === ""
      ) {
        throw new ApolloError(
          "Please fill all fields to update profile",
          "EMPTY_FIELD"
        );
      }

      const profilePictureCloud = await cloudinary.uploader.upload(
        profilePicture,
        {
          resource_type: "image",
        }
      );

      const bannerCloud = await cloudinary.uploader.upload(banner, {
        resource_type: "image",
      });

      user.profilePicture = profilePictureCloud.secure_url;
      user.banner = bannerCloud.secure_url;
      user.nickname = nickname;
      user.description = description;

      const res = await user.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async registerUser(_, { registerInput: { nickname, email, password } }) {
      //Check if user already exists
      const userAlreadyExists = await User.findOne({ email });
      const now = new Date();
      //Throw error if that user exists
      if (userAlreadyExists) {
        throw new ApolloError(
          `User with ${email} already exists`,
          "USER_ALREDY_EXISTS"
        );
      }

      if (nickname === "" || email === "" || password === "") {
        throw new ApolloError("Please fill all fields", "EMPTY_FIELD");
      }

      const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

      if (emailRegex.test(email) === false) {
        throw new ApolloError("Email address is not valid", "INVALID_EMAIL");
      }

      //Encrypt password
      const encryptedPassword = await bcrypt.hash(password, 10);
      //Build mongoose model
      const newUser = new User({
        nickname: nickname,
        email: email.toLowerCase(),
        password: encryptedPassword,
        banner:
          "https://res.cloudinary.com/dc6yaxeeh/image/upload/v1671388402/ohhrcvb4gp3pjhe3gypx.jpg",
        profilePicture: "",
        description: "I'm a new car guy!",
        date: date.format(now, "ddd, MMM DD YYYY"),
        blocked: false,
        admin: false,
      });
      //Create JWT
      const token = jwt.sign(
        {
          _id: newUser._id,
          email,
          name: newUser.nickname,
          friends: newUser.friends,
          admin: newUser.admin,
          blocked: newUser.blocked,
        },
        "TEMP_STRING",
        {
          expiresIn: "2h",
        }
      );

      newUser.token = token;
      //Save user
      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async loginUser(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          {
            _id: user._id,
            email,
            name: user.nickname,
            friends: user.friends,
            admin: user.admin,
            blocked: user.blocked,
          },
          "TEMP_STRING",
          {
            expiresIn: "2h",
          }
        );

        user.token = token;
        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new ApolloError(
          "Please check if email and password are correct",
          "INCORRECT_LOGIN_DATA"
        );
      }
    },

    async sendFriendRequest(_, { recevierId, senderId }) {
      const user = await User.findById(recevierId);

      //user.friendRequest = true;
      user.friendRequests.push(senderId);

      user.save();

      pubsub.publish("FRIEND_REQUEST_SEND", {
        friendRequestSend: {
          _id: recevierId,
          friendRequests: user.friendRequests,
        },
      });

      return {
        id: user.id,
        ...user._doc,
      };
    },

    async acceptFriendRequest(_, { recevierId, senderId }) {
      const recevier = await User.findById(recevierId);
      const sender = await User.findById(senderId);

      // const test = lodash.map(recevier.friendRequests, function (item) {
      //   return item.toString();
      // });
      // console.log(test);

      console.log(
        !lodash.includes(
          lodash.map(recevier.friends, function (item) {
            return item.toString();
          }),
          senderId
        )
      );

      if (
        !lodash.includes(
          lodash.map(recevier.friends, function (item) {
            return item.toString();
          }),
          senderId
        )
      ) {
        recevier.friendRequests = lodash.filter(
          recevier.friendRequests,
          function (item) {
            return !item.toString().includes(senderId);
          }
        );

        recevier.friends.push(senderId);
        sender.friends.push(recevierId);
        recevier.save();
        sender.save();
      } else {
        console.log(sender.friends);
        console.log(recevier.friends);
        console.log("Already friends");
      }

      return {
        id: recevier.id,
        ...recevier._doc,
      };
    },

    async addToFavourites(_, { userId, topicId }) {
      const user = await User.findById(userId);
      const topic = await Topic.findById(topicId);

      console.log(topic.name);
      console.log(topic.likes);
      topic.likes += 1;
      console.log(topic.likes);
      const topicLiked = await topic.save();

      user.favourites.push(topicId);

      pubsub.publish("USER_LIKED_TOPIC", {
        userLikedTopic: {
          likes: topic.likes,
        },
      });

      const res = await user.save();

      pubsub.publish("ADDED_TO_FAVOURITES", {
        addedToFavourites: {
          favourites: user.favourites,
        },
      });

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async blockUser(_, { ID }) {
      const user = await User.findById(ID);
      user.blocked = true;
      res = await user.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async unblockUser(_, { ID }) {
      const user = await User.findById(ID);
      user.blocked = false;
      res = await user.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },

  Subscription: {
    addedToFavourites: {
      subscribe: () => pubsub.asyncIterator("ADDED_TO_FAVOURITES"),
    },
    userLikedTopic: {
      subscribe: () => pubsub.asyncIterator("USER_LIKED_TOPIC"),
    },
    friendRequestSend: {
      subscribe: () => pubsub.asyncIterator("FRIEND_REQUEST_SEND"),
    },
  },
};
