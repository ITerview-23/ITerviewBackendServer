import { mergeTypeDefs } from "@graphql-tools/merge";
import quizListSchema from "./quizList/schema.js";
import quizSchema from "./quiz/schema.js";

const typeDefs = mergeTypeDefs([quizListSchema, quizSchema]);

export default typeDefs;
