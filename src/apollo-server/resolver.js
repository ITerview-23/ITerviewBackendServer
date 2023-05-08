import {mergeResolvers} from "@graphql-tools/merge";
import quizListResolver from "./quizList/resolver.js";
import quizResolver from "./quiz/resolver.js";
import userResolver from "./user/resolver.js";

const resolvers = mergeResolvers([quizListResolver, quizResolver, userResolver]);

export default resolvers;
