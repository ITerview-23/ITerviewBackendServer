import mongoose from "mongoose";

const UserQuizSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    quizId: {
        type: Number,
        required: true,
    },
    quizListId: {
        type: Number,
        required: true,
    },
    correct: {
        type: Boolean,
        required: true,
    }
}, { collection: 'userQuiz' });

const UserQuiz = mongoose.model('userQuiz', UserQuizSchema);

export default UserQuiz;