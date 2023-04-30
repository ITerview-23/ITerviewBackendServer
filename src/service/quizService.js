import Quiz from "../model/quiz.js"
import QuizList from "../model/quizList.js";

class QuizService {
    constructor() {
    }

    async getQuizList() {
        return await QuizList.find().exec();
    }

    async getAllQuiz(quizListId, userId) {
        let quiz = await Quiz.find({quizListId: quizListId}).exec();
        let quizList = [];
        for (let i = 0; i < quiz.length; i++) {
            let quizInfo = this.convertQuizInfo(quiz[i].quizInfo);
            quizList.push({
                quizInfo: quizInfo,
                quizId: quiz[i].quizId,
            });
        }
        return quizList;
    }

    async getQuiz(quizListId, userId) {
        let quiz = await Quiz.find({quizListId: quizListId}).exec();
        let nowQuiz = quiz[Math.floor(Math.random() * quiz.length)];
        let quizInfo = this.convertQuizInfo(nowQuiz.quizInfo);
        return {
            quizInfo: quizInfo,
            quizId: nowQuiz.quizId,
        }
    }

    convertQuizInfo(quizInfo) {
        let array = [];
        let now = '';
        for(let i = 0; i < quizInfo.length; i++){
            if(quizInfo[i] === '_') {
                if(now !== ''){
                    array.push(now);
                    now = '';
                }
                array.push('');
            }else{
                now += quizInfo[i];
            }
        }
        if(now !== '')
            array.push(now);
        return array;
    }

    async checkAnswer(quizId, userAnswerList) {
        let quiz = await Quiz.findOne({quizId: quizId}).exec();
        let answerMap = await this.setAnswerMap(quiz.answer);
        for (let i = 0; i < userAnswerList.length; i++) {
            if (!this.checkAnswerList(answerMap, quiz.answerList[i], userAnswerList[i]))
                return false;
        }
        return true;
    }

    async getAnswer(quizId) {
        let quiz = await Quiz.findOne({quizId: quizId}).exec();
        let answerMap = await this.setAnswerMap(quiz.answer);
        let answerList = [];
        for (let i = 0; i < quiz.answerList.length; i++) {
            for (let j = 0; j < quiz.answerList[i].length; j++) {
                if (answerMap.has(quiz.answerList[i][j])) {
                    answerList.push(answerMap.get(quiz.answerList[i][j])[0]);
                    answerMap.delete(quiz.answerList[i][j]);
                }
            }
        }
        return answerList;
    }

    async setAnswerMap(answerList) {
        let answerMap = new Map();
        for (let i = 0; i < answerList.length; i++)
            answerMap.set(answerList[i].key, answerList[i].value);
        return answerMap;
    }

    checkAnswerList(answerMap, answerList, userAnswer) {
        for (let i = 0; i < answerList.length; i++)
            if (answerMap.has(answerList[i]))
                if (answerMap.get(answerList[i]).includes(userAnswer)) {
                    answerMap.delete(answerList[i]);
                    return true;
                }
        return false;
    }

    async getDailyQuiz(userId) {
        let quizList = await this.getQuizList();
        let nowQuizList = quizList[Math.floor(Math.random() * quizList.length)];
        let quiz = await this.getQuiz(quizList.quizListId, userId);
        return quiz;
    }

    /**
     *
     * @returns {QuizService}
     */
    static getInstance() {
        if (!QuizService.instance) {
            QuizService.instance = new QuizService();
        }
        return QuizService.instance;
    }
}

export default QuizService;