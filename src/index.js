import {ApolloServer} from "apollo-server-express";
import express from "express";
import {createServer} from "http";
import mongoose from "mongoose";

import resolvers from "./apollo-server/resolver.js";
import typeDefs from "./apollo-server/schema.js";

let mongoDB ;
if(process.env.NODE_ENV !== "prod"){
    mongoDB = "mongodb://localhost:27017/quiz"
}else{
    mongoDB = "mongodb://172.20.79.204:27017/quiz"
}

console.log("mongoDB: ", mongoDB);
console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

mongoose
    .connect(mongoDB)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error));

const app = express();
const server = new ApolloServer({typeDefs, resolvers});
await server.start();

server.applyMiddleware({app, path: "/graphql"});

const httpserver = createServer(app);
httpserver.listen({port: 80}, () => {
    console.log(`Apollo Server on http://localhost:${80}/graphql`);
});