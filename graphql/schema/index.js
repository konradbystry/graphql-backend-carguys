const { makeExecutableSchema } = require("@graphql-tools/schema");
const _ = require("lodash");

const userSchema = require("./User");
const topicSchema = require("./Topic");
const postSchema = require("./Post");
const chatSchema = require("./Chat");
const messageSchema = require("./Message");
const bannerSchema = require("./Banner");
const feedSchema = require("./Feed");
const favouritesSchema = require("./Favourites");

// Multiple files to keep your project modularised
const schema = makeExecutableSchema({
  typeDefs: [
    userSchema.typeDefs, // First defines the type Query
    topicSchema.typeDefs, // Others extends type Query
    postSchema.typeDefs,
    chatSchema.typeDefs,
    messageSchema.typeDefs,
    bannerSchema.typeDefs,
    feedSchema.typeDefs,
    favouritesSchema.typeDefs,
  ],
  resolvers: _.merge(
    userSchema.resolvers,
    topicSchema.resolvers,
    postSchema.resolvers,
    chatSchema.resolvers,
    messageSchema.resolvers,
    bannerSchema.resolvers,
    feedSchema.resolvers,
    favouritesSchema.resolvers
  ),
});

module.exports = schema;
