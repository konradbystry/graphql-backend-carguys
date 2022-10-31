const {gql} = require('graphql-tag')
const mongoose = require('mongoose')

module.exports = gql`
    type User{
        nickname : String,
        email : String,
        password : String,
        posts : Int,
        premium : Boolean,
        freinds : Int,
        cars : Int,
        token : String   
    }

    input UserInput{
        nickname : String,
        email : String,
        password : String
    }

    input LoginInput{
        email : String,
        password : String
    }

    input RegisterInput{
        nickname : String,
        email : String,
        password : String,
        confirmPassword: String
    }

    type Query{
        getUser(ID: ID!): User!
        getUsers : [User]
        getUserByName(nickname : String!): [User]    
    }

    type Mutation{
        createUser(userInput: UserInput): User!
        deleteUser(ID: ID!): Boolean
        editUser(ID: ID!, userInput: UserInput): Boolean
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
    } 
`