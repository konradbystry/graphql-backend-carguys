const { makeExecutableSchema } = require('graphql-tools')
const _ = require('lodash');

const userSchema = require('./User')
const topicSchema = require('./Topic')
const postSchema = require('./Post')


// Multiple files to keep your project modularised
const schema = makeExecutableSchema({
    typeDefs: [
        userSchema.typeDefs, // First defines the type Query
        topicSchema.typeDefs, // Others extends type Query
        postSchema.typeDefs
    ],
    resolvers: _.merge(
        userSchema.resolvers,
        topicSchema.resolvers,
        postSchema.resolvers
    )
})

module.exports = schema