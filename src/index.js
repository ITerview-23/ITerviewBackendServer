import {ApolloServer} from "apollo-server-express";
import express from "express";
import {createServer} from "http";
import mongoose from "mongoose";
import dbSchema from "./apollo-server/db_crud/schema.js";
import dbResolver from "./apollo-server/db_crud/resolver.js";

import resolvers from "./apollo-server/resolver.js";
import typeDefs from "./apollo-server/schema.js";
import quizService from "./service/quizService.js";

let mongoDB ;
if(process.env.NODE_ENV !== "prod"){
    mongoDB = "mongodb://localhost:27017/quiz"
}else{
    mongoDB = process.env.MONGODB_URI + "/?retryWrites=true&w=majority";
}

console.log("mongoDB: ", mongoDB);
console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

mongoose
    .connect(mongoDB)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error));

const formatError = (error) => {
    return {
        message: error.message,
        status: 400,
    }
}

const app = express();
const server = new ApolloServer({typeDefs, resolvers, formatError});
const dbServer = new ApolloServer({typeDefs: dbSchema, resolvers: dbResolver, formatError});
await server.start();
await dbServer.start();

app.get("/health", (req, res) => {
    res.sendStatus(200)
})
server.applyMiddleware({app, path: "/graphql"});
dbServer.applyMiddleware({app, path: "/db/graphql"});



const httpserver = createServer(app);
httpserver.listen({port: 80}, () => {
    console.log(`Apollo Server on http://localhost:${80}/graphql`);
});

quizService.getInstance().setNNList().then(r => console.log("set NNList"));