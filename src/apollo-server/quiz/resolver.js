import quizService from "../../service/quizService.js";

const resolvers = {
    Query: {
        getQuiz: async (parent, args) => {
            const {quizListId, userId} = args;
            return await quizService.getInstance().getQuiz(quizListId, userId);
        },
        checkAnswer: async (parent, args) => {
            const {quizId, answer} = args;
            return await quizService.getInstance().checkAnswer(quizId, answer);
        },
        getAnswer: async (parent, args) => {
            const {quizId} = args;
            return await quizService.getInstance().getAnswer(quizId);
        },
    },
};

export default resolvers;