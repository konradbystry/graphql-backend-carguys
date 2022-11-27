const { gql } = require("graphql-tag");
const mongoose = require("mongoose");

module.exports = gql`
  type Chat {
    _id: String
    date: String
    userId: String
    secondUserId: String
  }

  input ChatInput {
    userId: String
    secondUserId: String
  }

  type Query {
    getChats(userId: String): [Chat]
    getChat(name: String): Chat!
    isAlreadyChatting(userId: String, secondUserId: String): Chat
  }

  type Mutation {
    createChat(chatInput: ChatInput): Chat!
    deleteChat(ID: ID!): Boolean
  }
`;
