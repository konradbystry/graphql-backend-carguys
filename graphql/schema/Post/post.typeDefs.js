const {gql} = require('graphql-tag')
const mongoose = require('mongoose')

module.exports = gql`
    type Post{
        userId: String,
        topicId: String,
        date: String,
        text: String,
        image: String
    }

    input PostInput{
        text: String,
        userId : String,
        topicId : String
    }

    type Query{
        getPosts(topicId: String) : [Post]
        getPost(ID: ID!): Post!
    }

    type Mutation{
        createPost(postInput : PostInput): Post! #to do - add params userId and topicId
        editPost(ID: ID!, postInput: PostInput): Boolean
        deletePost(ID: ID!): Boolean
    }
`