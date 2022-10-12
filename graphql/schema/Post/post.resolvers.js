
const User = require('../../../models/User')
const Post = require('../../../models/Post')
const Topic = require('../../../models/Topic')
// const {ObjectId} = require('mongodb')
const mongoose = require('mongoose')
module.exports = {
    Query: {
        async getPosts(_, {topicId}) {
            return await Post.find({topicId})
        },
        async getPost(_, {ID}){
            return await Post.findById(ID)
        }
    },
    Mutation: {
        async createPost(_, {postInput: {text, userId, topicId}}){
            const createdPost = new Post({
                text : text,
                userId : userId,
                topicId : topicId,
                date : "",
                image : ""
            })

            const res = await createdPost.save()

            return {
                id: res.id,
                ...res._doc
            }
        }        
    }
}