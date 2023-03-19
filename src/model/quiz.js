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
});

const OsQuiz = mongoose.model('os_quiz', QuizSchema);
const DBQuiz = mongoose.model('db_quiz', QuizSchema);

export {OsQuiz, DBQuiz}