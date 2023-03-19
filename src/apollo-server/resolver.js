import { mergeResolvers } from "@graphql-tools/merge";
import quizListResolver from "./quizList/resolver.js";
import quizResolver from "./quiz/resolver.js";

const resolvers = mergeResolvers([quizListResolver, quizResolver]);

export default resolvers;
