const { gql } = require("graphql-tag");
const mongoose = require("mongoose");

module.exports = gql`
  type Topic {
    _id: String
    name: String
    posts: [String]
    premium: Boolean
    ownerId: String
    likes: Int
    firstPost: String
    banner: String
    date: String
  }

  input TopicInput {
    name: String
    ownerId: String
    firstPost: String
    banner: String
  }

  type Query {
    getTopics: [Topic]
    getTopic(ID: ID!): Topic!
    getTopicByName(name: String!): [Topic]
    getUsersFavourites(userId: ID): [Topic]
  }

  type Mutation {
    createTopic(topicInput: TopicInput): Topic!
    editTopic(ID: ID!, topicInput: TopicInput!): Boolean
    deleteTopic(ID: ID!): Topic!
  }

  type Subscription {
    topicCreated: Topic
    topicDeleted: Topic
  }
`;
