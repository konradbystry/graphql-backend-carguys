const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')

//const MONGODB = 'mongodb://konor:rakieta120@ac-bgvz40d-shard-00-00.qwxas2a.mongodb.net:27017,ac-bgvz40d-shard-00-01.qwxas2a.mongodb.net:27017,ac-bgvz40d-shard-00-02.qwxas2a.mongodb.net:27017/?ssl=true&replicaSet=atlas-14f8rs-shard-0&authSource=admin&retryWrites=true&w=majority'
const localMONGODB = 'mongodb://localhost:27017'

const schema = require('./graphql/schema')



const server = new ApolloServer({
    schema
})

mongoose.connect(localMONGODB)
    .then(()=>{
        console.log("MongoDB connection successful")
        return server.listen({port: 5000})
    })
    .then((res)=>{
        console.log(`Server running at ${res.url}`)
    })