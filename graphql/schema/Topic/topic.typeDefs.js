const { gql } = require("graphql-tag");
const mongoose = require("mongoose");

module.exports = gql`
  type Topic {
    _id: String
    name: String
    posts: [String]
    premium: Boolean
    ownerId: String
  }

  input TopicInput {
    name: String
    ownerId: String
  }

  type Query {
    getTopics: [Topic]
    getTopic(ID: ID!): Topic!
    getTopicByName(name: String!): Topic!
  }

  type Mutation {
    createTopic(topicInput: TopicInput): Topic!
    editTopic(ID: ID!, topicInput: TopicInput!): Boolean
    deleteTopic(ID: ID!): Boolean
  }
`;
