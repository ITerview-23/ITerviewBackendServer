import {mergeTypeDefs} from "@graphql-tools/merge";
import quizListSchema from "./quizList/schema.js";
import quizSchema from "./quiz/schema.js";
import userSchema from "./user/schema.js";

const typeDefs = mergeTypeDefs([quizListSchema, quizSchema, userSchema]);

export default typeDefs;
