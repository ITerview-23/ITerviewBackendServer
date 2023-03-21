import dbService from "../../service/dbService.js";

const resolvers = {
    Query: {
        getQuizList: (parent, args) => {
            return dbService.getInstance().getDBInfoQuizList(args);
        },
        getQuiz: (parent, args) => {
            return dbService.getInstance().getDBInfoQuiz(args);
        }
    },
    Mutation: {
        addQuizListDBInfo: (parent, args) => {
            const {quizListId, name, description, image} = args;
            return dbService.getInstance().addQuizListDBInfo(quizListId, name, description, image);
        },
        addQuizDBInfo: (parent, args) => {
            const {quizType, quizId, quizInfo, answer} = args;
            return dbService.getInstance().addQuizDBInfo(quizType, quizId, quizInfo, answer);
        }
    }
};

export default resolvers;