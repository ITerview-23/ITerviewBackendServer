import mongoose from "mongoose";
const answerSchema = {
    key: {
        type: String,
        required: true,
    },
    value: {
        type: [String],
        required: true,
    }
}

const QuizSchema = new mongoose.Schema({
    quizType: {
        type: String,
        required: true,
    },
    quizId: {
        type: Number,
        required: true,
        primaryKey: true,
    },
    quizInfo: {
        type: String,
        required: true,
    },
    answer: {
        type: [answerSchema],
        required: true,
    }
} , {collection: 'quiz'});

const Quiz = mongoose.model('quiz', QuizSchema);

export default Quiz;