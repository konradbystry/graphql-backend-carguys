const { gql } = require("graphql-tag");
const mongoose = require("mongoose");

module.exports = gql`
  type Feed {
    _id: String
    date: String
    title: String
    text: String
    image: String
  }

  input FeedInput {
    title: String
    text: String
    image: String
  }

  type Query {
    getFeed: [Feed]
  }

  type Mutation {
    createFeed(feedInput: FeedInput): Feed!
    deleteFeed(ID: ID!): Feed!
  }
`;
