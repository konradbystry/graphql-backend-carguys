const { gql } = require("graphql-tag");
const mongoose = require("mongoose");

module.exports = gql`
  type Banner {
    _id: String
    image: String
  }

  type Query {
    getBanner(id: ID!): Banner!
    getBanners: [Banner]
  }

  type Mutation {
    createBanner(image: String): Banner!
  }
`;
