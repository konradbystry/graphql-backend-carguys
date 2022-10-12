
const User = require('../../../models/User')
const Post = require('../../../models/Post')
const Topic = require('../../../models/Topic')
// const {ObjectId} = require('mongodb')
const mongoose = require('mongoose')
module.exports = {
    Query: {
        async getUser(_, {ID}) {
            return await User.findById(ID)
        },
        async getUsers() {
            return await User.find()
        },
        async getUserByName(_, {nickname}) {
          
            //return await User.findOne({nickname})
            return await User.find({nickname})
        }
    },
    Mutation: {
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

            return {
                id: res.id,
                ...res._doc
            }
        }       
    }
}