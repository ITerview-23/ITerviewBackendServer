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
        },
        updateQuizListDBInfo: (parent, args) => {
            const {updatedInfo, updateInfo} = args;
            return dbService.getInstance().updateQuizListDBInfo(updatedInfo, updateInfo);
        },
        updateQuizDBInfo: (parent, args) => {
            const {updatedInfo, updateInfo} = args;
            return dbService.getInstance().updateQuizDBInfo(updatedInfo, updateInfo);
        },
        deleteQuizListDBInfo: (parent, args) => {
            const {deletedInfo} = args;
            return dbService.getInstance().deleteQuizListDBInfo(deletedInfo);
        },
        deleteQuizDBInfo: (parent, args) => {
            const {deletedInfo} = args;
            return dbService.getInstance().deleteQuizDBInfo(deletedInfo);
        }
    }
};

export default resolvers;