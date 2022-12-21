//const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const express = require("express");
const { createServer } = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const schema = require("./graphql/schema");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const { ApolloServer } = require("apollo-server-express");
const { areOptionsEqual } = require("@mui/base");

//const MONGODB = 'mongodb://konor:rakieta120@ac-bgvz40d-shard-00-00.qwxas2a.mongodb.net:27017,ac-bgvz40d-shard-00-01.qwxas2a.mongodb.net:27017,ac-bgvz40d-shard-00-02.qwxas2a.mongodb.net:27017/?ssl=true&replicaSet=atlas-14f8rs-shard-0&authSource=admin&retryWrites=true&w=majority'
// const localMONGODB = 'mongodb://localhost:27017'

// const schema = require('./graphql/schema')

// const server = new ApolloServer({
//     schema
// })

// mongoose.connect(localMONGODB)
//     .then(()=>{
//         console.log("MongoDB connection successful")
//         return server.listen({port: 5000})
//     })
//     .then((res)=>{
//         console.log(`Server running at ${res.url}`)
//     })

const localMONGODB = "mongodb://localhost:27017";

(async function () {
  const app = express();

  const httpServer = createServer(app);

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    { server: httpServer, path: "/graphql" }
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });
  mongoose.connect(localMONGODB, { useNewUrlParser: true });

  const PORT = 5000;
  httpServer.listen(PORT, () => {
    console.log("Http server is now running on " + PORT);
  });
})();
