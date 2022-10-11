const Recipe = require('../models/Recipe')
const User = require('../models/User')
const Post = require('../models/Post')
const Topic = require('../models/Topic')
// const {ObjectId} = require('mongodb')
const mongoose = require('mongoose')
module.exports = {
    Query: {
        async recipe(_, {ID}) {
            return await Recipe.findById(ID)
        },
        async getRecipies(_, {amount}) {
            return await Recipe.find().sort({createdAt: -1}).limit(amount)
        },



        async getUser(_, {ID}) {
            return await User.findById(ID)
        },
        async getUsers() {
            return await User.find()
        },
        async getUserByName(_, {nickname}) {
          
            //return await User.findOne({nickname})
            return await User.find({nickname})
        },



        async getPosts(_, {topicId}) {
            return await Post.find({topicId})
        },
        async getPost(_, {ID}){
            return await Post.findById(ID)
        },

        async getTopics() {
            return await Topic.find()
        },
        async getTopic(_, {ID}){
            return await Topic.findById(ID)
        },
        async getTopicByName(_, {name}){
            return await Topic.find({name: name})
        }

    },
    Mutation: {
        async createRecipe(_, {recipeInput: {name, description}}) { 
            const createdRecipe = new Recipe({
                name: name,
                description: description,
                createdAt: new Date().toISOString(),
                thumbsUp: 0,
                thumbsDown: 0
            })

            const res = await createdRecipe.save()

            return{
                id: res.id,
                ...res._doc
            }
        },
    async deleteRecipe(_, {ID}) {
        const wasDeleted = (await Recipe.deleteOne({_id: ID})).deletedCount
        //1 if was, 0 if was not
        return wasDeleted
    },
    async editRecipe(_, {ID, recipeInput: {name, description}}) {
        const wasEdited = (await Recipe.updateOne({_id: ID}, {name: name, description: description}))
        //1 if was, 0 if was not
        return wasEdited.matchedCount

    },

    async createUser(_, {userInput: {nickname, email, password}}) {
        const createdUser = new User({
            nickname : nickname,
            email : email,
            password: password,
            posts : [],
            premium : 0,
            freinds : [],
            cars : []
        })

        const res = await createdUser.save()

        return{
            id: res.id,
            ...res._doc
        }
    },

    async createTopic(_, {topicInput: {name, ownerId}}){
        const createdTopic = new Topic({
            name : name,
            posts : [],
            premium : 0,
            ownerId : ownerId
        })


        const res = await createdTopic.save()

        return{
            id: res.id,
            ...res._doc
        }
    },

    async createPost(_, {postInput: {text, userId, topicId}}){
        const createdPost = new Post({
            text : text,
            userId : userId,
            topicId : topicId,
            date : "",
            image : ""
        })

        const res = await createdPost.save()

        return{
            id: res.id,
            ...res._doc
        }
    }
        
    }
}