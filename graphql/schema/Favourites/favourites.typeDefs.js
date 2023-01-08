const { gql } = require("graphql-tag");
const mongoose = require("mongoose");

module.exports = gql`
  type Favourites {
    _id: String
    userId: String
    topicId: String
  }

  input FavouritesInput {
    userId: String
    topicId: String
  }

  type Query {
    getFavourites(userId: String): [Favourites]
  }

  type Mutation {
    addFavourites(favouritesInput: FavouritesInput): Favourites!
    deleteFavourites(topicId: ID!): Boolean
  }

  type Subscription {
    addedFavourites: Favourites
    topicLiked: Topic
  }
`;
