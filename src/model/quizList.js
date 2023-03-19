import mongoose from "mongoose";

const QuizListSchema = new mongoose.Schema({
    quizListId: {
        type: Number,
        required: true,
        primaryKey: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}, { collection: 'quizLists' });

const QuizList = mongoose.model('quizLists', QuizListSchema);

export default QuizList;