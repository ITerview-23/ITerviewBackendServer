import mongoose from "mongoose";

const QuizListSchema = new mongoose.Schema({
    quizId: {
        type: Number,
        required: true,
        primaryKey: true,
    },
    name: {
        type: String,
        required: true,
    }
});

const QuizList = mongoose.model('QuizList', QuizListSchema);

export default QuizList;