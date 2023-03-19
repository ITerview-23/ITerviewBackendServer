const resolvers = {
    Query: {
        getQuiz: (parent, args) => {
            const { quizListId, userId } = args;
            return [{ quizInfo: "Sample quiz 1", quizId: 1 }, { quizInfo: "Sample quiz 2", quizId: 2 }];
        },
        checkAnswer: (parent, args) => {
            const { answer } = args;
            return true;
        },
        getAnswer: (parent, args) => {
            const { quizId } = args;
            return { answer: "Sample answer", quizId: 1 };
        },
    },
};

export default resolvers;