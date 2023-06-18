import Quiz from "../model/quiz.js"
import QuizList from "../model/quizList.js";
import user_quiz from "../model/user_quiz.js";
import NewQuiz from "../model/newQuiz.js";

class QuizService {
    constructor() {
    }

    async getNNList(input){
        let url = "http://localhost:8080/parse?input=" + input;
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    async setNNList(){
        let quiz = await NewQuiz.find({NNList: null}).exec();
        for(let i = 0; i < quiz.length; i++){
            let NNList = await this.getNNList(quiz[i].quizInfo);
            quiz[i].NNList = NNList;
            await quiz[i].save();
        }
    }

    async isCorrect(userId, quizId){
        let quiz = await user_quiz.findOne({quizId: quizId, userId: userId}).exec();
        if(quiz == null) return 0;
        if(quiz.correct) return 1;
        return -1;
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
                correct: await this.isCorrect(userId, quiz[i].quizId)
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
            correct: await this.isCorrect(userId, nowQuiz.quizId)
        }
    }

    async getQuizV2(quizListId, userId) {
        let quiz = await NewQuiz.find({quizListId: quizListId}).exec();
        let nowQuiz = quiz[Math.floor(Math.random() * quiz.length)];
        return{
            quizInfo: nowQuiz.quizInfo,
            quizId: nowQuiz.quizId,
            answerNum: nowQuiz.answerNum,
            correct: await this.isCorrect(userId, nowQuiz.quizId)
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
    async save_user_quiz(userId, quiz, correct){
        let user = user_quiz.findOne({quizId: quiz.quizId, userId: userId}).exec();
        if(user == null){
            user = new user_quiz({
                userId: userId,
                quizId: quiz.quizId,
                quizListId: quiz.quizListId,
                correct: correct
            })
            await user.save();
        }
        else if(user.correct != correct){
            user.correct = correct;
            await user.save();
        }
    }

    async checkAnswer(quizId, userAnswerList, userId) {
        let quiz = await Quiz.findOne({quizId: quizId}).exec();
        let answerMap = await this.setAnswerMap(quiz.answer);
        for (let i = 0; i < userAnswerList.length; i++) {
            if (!this.checkAnswerList(answerMap, quiz.answerList[i], userAnswerList[i])) {
                if(userId != null) this.save_user_quiz(userId, quiz, false)
                return false;
            }
        }
        if(userId != null) this.save_user_quiz(userId, quiz, true)
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
                    answerMap.delete(answerList[i]);}
        if(answerMap.size === 0) return true;
        return false;
    }

    async getDailyQuiz(userId) {
        let quizList = await this.getQuizList();
        let nowQuizList = quizList[Math.floor(Math.random() * quizList.length)];
        let quiz = await this.getQuiz(nowQuizList.quizListId, userId);
        return {
            quizInfo: quiz.quizInfo,
            quizId: quiz.quizId,
            correct: await this.isCorrect(userId, quiz.quizId)
        }
    }

    async reportQuiz(quizListId, quizInfo, answer) {
        let compareQuizId = await this.checkAnswerListExists(answer, quizListId);
        if(compareQuizId.length !== 0){
            for(let i = 0; i < compareQuizId.length; i++){
                if(await this.compareNNList(compareQuizId[i], await this.getNNList(quizInfo)) > 0.5){
                    let quiz = await NewQuiz.findOne({quizId: compareQuizId[i]}).exec();
                    return {
                        result: false,
                        message: "이미 비슷하게 문제가 존재합니다 : " + quiz.quizInfo
                    }
                }
            }
        }
        return {
            result: true,
            message: "개발중 입니다"
        }
    }

    async checkAnswerListExists(answerList, quizListId) {
        let quiz = await NewQuiz.find({quizListId: quizListId}).exec();
        let listQuizId = [];
        for(let i = 0; i < quiz.length; i++){
            let answerMap = await this.setAnswerMap(quiz[i].answer);
            for (let j = 0; j < answerList.length; j++) {
                if (this.checkAnswerList(answerMap, quiz[i].answerList[j], answerList[j]))
                    listQuizId.push(quiz[i].quizId);
            }
        }
        return listQuizId;
    }

    async compareNNList(quizId, NNList){
        let quiz = await NewQuiz.findOne({quizId: quizId}).exec();
        let quizNNList = new Set(quiz.NNList);
        let intersection = new Set([...quizNNList].filter(x => NNList.includes(x)));
        quizNNList.add(...NNList);
        let total = quizNNList.size;
        return intersection.size / total;
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