import {OsQuiz, DBQuiz} from "../model/quiz.js"
import QuizList from "../model/quizList.js";

class QuizService {
    constructor() {
    }

    async getQuizList() {
        let quizList = await QuizList.find().exec();
        return quizList;
    }

    getQuiz(quizListId, userId){
        let quiz;
        switch (quizListId) {
            case 1:
                quiz = OsQuiz.find().exec();
                break;
            case 2:
                quiz = DBQuiz.find().exec();
                break;
            default:
                break;
        }
        return quiz;
    }

    /**
     *
     * @returns {QuizService}
     */
    static getInstance(){
        if(!QuizService.instance){
            QuizService.instance = new QuizService();
        }
        return QuizService.instance;
    }
}

export default QuizService;