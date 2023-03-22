import dbService from "../../service/dbService.js";

const resolvers = {
    Query: {
        getQuizList: async (parent, args) => {
            return await dbService.getInstance().getDBInfoQuizList(args);
        },
        getQuiz: async (parent, args) => {
            return await dbService.getInstance().getDBInfoQuiz(args);
        }
    },
    Mutation: {
        addQuizListDBInfo: async (parent, args) => {
            const {dbInfo} = args;
            return await dbService.getInstance().addQuizListDBInfo(dbInfo);
        },
        addQuizDBInfo: async (parent, args) => {
            const {dbInfo} = args;
            return await dbService.getInstance().addQuizDBInfo(dbInfo);
        },
        updateQuizListDBInfo: async (parent, args) => {
            const {updatedInfo, updateInfo} = args;
            return await dbService.getInstance().updateQuizListDBInfo(updatedInfo, updateInfo);
        },
        updateQuizDBInfo: async (parent, args) => {
            const {updatedInfo, updateInfo} = args;
            return await dbService.getInstance().updateQuizDBInfo(updatedInfo, updateInfo);
        },
        deleteQuizListDBInfo: async (parent, args) => {
            const {deletedInfo} = args;
            return await dbService.getInstance().deleteQuizListDBInfo(deletedInfo);
        },
        deleteQuizDBInfo: async (parent, args) => {
            const {deletedInfo} = args;
            return await dbService.getInstance().deleteQuizDBInfo(deletedInfo);
        }
    }
};

export default resolvers;