const { gql } = require("graphql-tag");
const mongoose = require("mongoose");

module.exports = gql`
  type User {
    _id: String
    nickname: String
    email: String
    password: String
    posts: [String]
    premium: Boolean
    friends: [String]
    cars: [String]
    token: String
    friendRequests: [String]
    favourites: [String]
    banner: String
    profilePicture: String
    description: String
    date: String
  }

  input UserInput {
    nickname: String
    email: String
    password: String
  }

  input EditInput {
    id: String
    profilePicture: String
    banner: String
    nickname: String
    description: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input RegisterInput {
    nickname: String
    email: String
    password: String
    confirmPassword: String
  }

  type Query {
    getUser(ID: ID!): User
    getUsers: [User]
    getUserByEmail(email: String!): [User]
    getFriends(friends: [ID]): [User]
  }

  type Mutation {
    createUser(userInput: UserInput): User!
    deleteUser(ID: ID!): Boolean
    editUser(editInput: EditInput): User!
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    sendFriendRequest(recevierId: ID!, senderId: ID!): User
    acceptFriendRequest(recevierId: ID!, senderId: ID!): User
    addToFavourites(userId: ID!, topicId: ID!): User
  }

  type Subscription {
    addedToFavourites: User
    userLikedTopic: Topic
  }
`;
