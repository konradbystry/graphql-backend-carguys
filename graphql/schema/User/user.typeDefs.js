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
        cars : Int   
    }

    input UserInput{
        nickname : String,
        email : String,
        password : String
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

        

        

    }

  
`