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
  server.applyMiddleware({
    app,
    bodyParserConfig: {
      limit: "100mb",
    },
  });
  mongoose.connect(localMONGODB, { useNewUrlParser: true });

  const PORT = 5000;
  httpServer.listen(PORT, () => {
    console.log("Http server is now running on " + PORT);
  });
})();
