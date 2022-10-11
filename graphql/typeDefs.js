const {gql} = require('graphql-tag')
const mongoose = require('mongoose')

module.exports = gql`
    type Recipe{
        name: String,
        description: String,
        createdAt: String,
        thumbsUp: Int,
        thumbsDown: Int
    }

    input RecipeInput{
        name: String,
        description: String
    }

    input EditRecipeInput{
        name: String
    }

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

    type Topic{
        name: String,
        posts: [String],
        premium: Boolean,
        ownerId: String
    }

    input TopicInput{
        name: String,
        ownerId : String
    }

    type Query{
        recipe(ID: ID!): Recipe!,
        getRecipies(amount: Int): [Recipe]

        getUser(ID: ID!): User!
        getUsers : [User]
        getUserByName(nickname : String!): [User]

        getPosts(topicId: String) : [Post]
        getPost(ID: ID!): Post!

        getTopics: [Topic]
        getTopic(ID: ID!): Topic!
        getTopicByName(name: String!): Topic!
    }

    type Mutation{
        createRecipe(recipeInput: RecipeInput): Recipe!
        deleteRecipe(ID: ID!): Boolean
        editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean

        createUser(userInput: UserInput): User!
        deleteUser(ID: ID!): Boolean
        editUser(ID: ID!, userInput: UserInput): Boolean

        createPost(postInput : PostInput): Post! #to do - add params userId and topicId
        editPost(ID: ID!, postInput: PostInput): Boolean
        deletePost(ID: ID!): Boolean

        createTopic(topicInput: TopicInput): Topic!
        editTopic(ID: ID!, topicInput: TopicInput!): Boolean
        deleteTopic(ID: ID!): Boolean

        

    }

  
`