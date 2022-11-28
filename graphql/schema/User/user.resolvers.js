const User = require("../../../models/User");
const Post = require("../../../models/Post");
const Topic = require("../../../models/Topic");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const lodash = require("lodash");

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
  },
  Mutation: {
    async createUser(_, { userInput: { nickname, email, password } }) {
      const createdUser = new User({
        nickname: nickname,
        email: email,
        password: password,
        posts: [],
        premium: 0,
        friends: [],
        cars: [],
        token: "just test",
      });

      const res = await createdUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async registerUser(_, { registerInput: { nickname, email, password } }) {
      //Check if user already exists
      const userAlreadyExists = await User.findOne({ email });

      //Throw error if that user exists
      if (userAlreadyExists) {
        throw new ApolloError(
          `User with ${email} already exists`,
          "USER_ALREDY_EXISTS"
        );
      }
      //Encrypt password
      const encryptedPassword = await bcrypt.hash(password, 10);
      //Build mongoose model
      const newUser = new User({
        nickname: nickname,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
      //Create JWT
      const token = jwt.sign(
        { _id: newUser._id, email, name: newUser.nickname },
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
          { _id: user._id, email, name: user.nickname, friends: user.friends },
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
        throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD");
      }
    },

    async sendFriendRequest(_, { recevierId, senderId }) {
      const user = await User.findById(recevierId);

      user.friendRequest = true;
      user.friendRequests.push(senderId);

      user.save();

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
      console.log(senderId);
      console.log(recevierId);
      console.log(recevier.friends + " here?");
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
  },
};
