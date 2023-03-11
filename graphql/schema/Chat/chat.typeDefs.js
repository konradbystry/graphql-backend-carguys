const { gql } = require("graphql-tag");
const mongoose = require("mongoose");

module.exports = gql`
  type Chat {
    _id: String
    date: String
    userId: String
    secondUserId: String
    initMessage: String
    lastMessage: String
    initUserId: String
    initDate: String
  }

  input ChatInput {
    userId: String
    secondUserId: String
  }

  input CreateChat {
    initMessage: String
    userId: String
    secondUserId: String
    initUserId: String
  }

  type Query {
    getChats(userId: String): [Chat]
    getChat(ID: ID!): Chat!
    isAlreadyChatting(userId: String, secondUserId: String): Chat
  }

  type Mutation {
    createChat(createChat: CreateChat): Chat!
    deleteChat(ID: ID!): Boolean
  }

  type Subscription {
    chatCreated: Chat
  }
`;
