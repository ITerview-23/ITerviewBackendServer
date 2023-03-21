import {ApolloServer} from "apollo-server-express";
import express from "express";
import {createServer} from "http";
import mongoose from "mongoose";
import dbSchema from "./apollo-server/db_crud/schema.js";
import dbResolver from "./apollo-server/db_crud/resolver.js";

import resolvers from "./apollo-server/resolver.js";
import typeDefs from "./apollo-server/schema.js";

let mongoDB ;
if(process.env.NODE_ENV !== "prod"){
    mongoDB = "mongodb://localhost:27017/quiz"
}else{
    mongoDB = "mongodb://prod-mongodb-service:27017/quiz"
}

console.log("mongoDB: ", mongoDB);
console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

mongoose
    .connect(mongoDB)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error));

const app = express();
const server = new ApolloServer({typeDefs, resolvers});
const dbServer = new ApolloServer({typeDefs: dbSchema, resolvers: dbResolver});
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