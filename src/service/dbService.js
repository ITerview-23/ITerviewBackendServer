import Quiz from "../model/quiz.js"
import QuizList from "../model/quizList.js";

class DBService {
    constructor() {
    }

    async getDBInfoQuizList(quizListInfo) {
        try {
            return await QuizList.find(quizListInfo).exec();
        } catch (e) {
            console.log(e);
            return "get error\n" + e;
        }
    }

    async getDBInfoQuiz(quizInfo) {
        try {
            return await Quiz.find(quizInfo).exec();
        } catch (e) {
            console.log(e);
            return "get error\n" + e;
        }
    }

    async addQuizListDBInfo(dbInfo) {
        try {
            let quizList = new QuizList(dbInfo);
            await quizList.save();
            return quizList;
        } catch (e) {
            console.log(e);
            return "add error\n" + e;
        }
    }

    async addQuizDBInfo(dbInfo) {

        try {
            let quiz = new Quiz(dbInfo);
            await quiz.save();
            return quiz;
        } catch (e) {
            console.log(e);
            return "add error\n" + e;
        }
    }

    async updateQuizListDBInfo(updatedInfo, updateInfo) {
        try {
            let result = await QuizList.updateMany(updatedInfo, {$set: updateInfo});
            return result.matchedCount + "개의 데이터가 수정되었습니다.";
        } catch (e) {
            console.log(e);
            return "update error\n" + e;
        }
    }

    async updateQuizDBInfo(updatedInfo, updateInfo) {
        try {
            let result = await Quiz.updateMany(updatedInfo, {$set: updateInfo});
            return result.matchedCount + "개의 데이터가 수정되었습니다.";
        } catch (e) {
            console.log(e);
            return "update error\n" + e;
        }
    }

    async deleteQuizListDBInfo(deletedInfo) {
        try {
            let result = await QuizList.deleteMany(deletedInfo);
            return result.deletedCount + "개의 데이터가 삭제되었습니다.";
        } catch (e) {
            console.log(e);
            return "delete error\n" + e;
        }
    }

    async deleteQuizDBInfo(deletedInfo) {
        try {
            let result = await Quiz.deleteMany(deletedInfo);
            return result.deletedCount + "개의 데이터가 삭제되었습니다.";
        } catch (e) {
            console.log(e);
            return "delete error\n" + e;
        }
    }

    /**
     *
     * @returns {DBService}
     */
    static getInstance() {
        if (!DBService.instance) {
            DBService.instance = new DBService();
        }
        return DBService.instance;
    }
}

export default DBService;