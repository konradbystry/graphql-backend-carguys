const { gql } = require("graphql-tag");
const mongoose = require("mongoose");

module.exports = gql`
  type Message {
    chatId: String
    date: String
    text: String
    image: String
    userName: String
    userId: String
  }

  input MessageInput {
    text: String
    userId: String
    userName: String
    chatId: String
    date: String
    image: String
  }

  type Query {
    getMessages(chatId: String): [Message]
  }

  type Mutation {
    createMessage(messageInput: MessageInput): Message!
    editMessage(ID: ID!, messageInput: MessageInput): Boolean
    deleteMessage(ID: ID!): Boolean
  }

  type Subscription {
    messageCreated: Message
  }
`;
