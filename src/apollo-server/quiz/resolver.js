import quizService from "../../service/quizService.js";

const resolvers = {
    Query: {
        getQuiz: async (parent, args) => {
            const {quizListId, userId} = args;
            return await quizService.getInstance().getQuiz(quizListId, userId);
        },
        checkAnswer: async (parent, args) => {
            const {quizId, answer, userId} = args;
            return await quizService.getInstance().checkAnswer(quizId, answer, userId);
        },
        getAnswer: async (parent, args) => {
            const {quizId} = args;
            return await quizService.getInstance().getAnswer(quizId);
        },
        getDailyQuiz: async (parent, args) => {
            const {userId} = args;
            return await quizService.getInstance().getDailyQuiz(userId);
        },
        getQuizList: async (parent, args) => {
            const {quizListId, userId} = args;
            return await quizService.getInstance().getAllQuiz(quizListId, userId);
        }
    },
};

export default resolvers;