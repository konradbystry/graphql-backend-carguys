const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    nickname : String,
    email : String,
    password: String,
    posts : [Schema.Types.ObjectId],
    premium : Boolean,
    freinds : [Schema.Types.ObjectId],
    cars : [Schema.Types.ObjectId],
    token : String
})

module.exports = model('User', userSchema)