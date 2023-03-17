import {ApolloServer} from "apollo-server-express";
import express from "express";
import {createServer} from "http";

import resolvers from "./apollo-server/resolver.js";
import typeDefs from "./apollo-server/schema.js";

const app = express();
const server = new ApolloServer({typeDefs, resolvers});
await server.start();

server.applyMiddleware({app, path: "/graphql"});

const httpserver = createServer(app);
httpserver.listen({port: 80}, () => {
    console.log(`Apollo Server on http://localhost:${80}/graphql`);
});