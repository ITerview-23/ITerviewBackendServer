import Quiz from "../model/quiz.js"
import QuizList from "../model/quizList.js";

class DBService {
    constructor() {
    }

    async getDBInfoQuizList({quizListId, name, description, image}) {
        let dbInfo = {};
        if (quizListId) dbInfo.quizListId = quizListId;
        if (name) dbInfo.name = name;
        if (description) dbInfo.description = description;
        if (image) dbInfo.image = image;
        try {
            return await QuizList.find(dbInfo).exec();
        } catch (e) {
            console.log(e);
            return "get error\n" + e;
        }
    }

    async getDBInfoQuiz({quizType, quizId, quizInfo}) {
        let dbInfo = {};
        if (quizType) dbInfo.quizType = quizType;
        if (quizId) dbInfo.quizId = quizId;
        if (quizInfo) dbInfo.quizInfo = quizInfo;
        try {
            return await Quiz.find(dbInfo).exec();
        } catch (e) {
            console.log(e);
            return "get error\n" + e;
        }
    }

    async addQuizListDBInfo(quizListId, name, description, image) {
        let dbInfo = {
            quizListId: quizListId,
            name: name,
            description: description,
            image: image
        };
        try {
            let quizList = new QuizList(dbInfo);
            await quizList.save();
            return quizList;
        } catch (e) {
            console.log(e);
            return "add error\n" + e;
        }
    }

    async addQuizDBInfo(quizType, quizId, quizInfo, answer) {
        let dbInfo = {
            quizType: quizType,
            quizId: quizId,
            quizInfo: quizInfo,
            answer: answer
        };
        try {
            let quiz = new Quiz(dbInfo);
            await quiz.save();
            return quiz;
        } catch (e) {
            console.log(e);
            return "add error\n" + e;
        }
    }

    async updateDBInfo(collection, id, infoList) {
        let dbInfo = {};
        switch (collection) {
            case "quiz":
                dbInfo = await Quiz.find({id}).exec();
                break;
            case "quizList":
                dbInfo = await QuizList.find({id}).exec();
                break;
            default:
                return "collection is not found";
        }
        for (let info in infoList) {
            dbInfo[info.key] = info.value;
        }
        try {
            await dbInfo.save();
        } catch (e) {
            return "update error\n" + e;
        }
        return dbInfo.toString();
    }

    async deleteDBInfo(collection, id) {
        let deleteInfo;
        switch (collection) {
            case "quiz":
                deleteInfo = await Quiz.delete({id}).exec();
                return deleteInfo.toString();
            case "quizList":
                deleteInfo = await QuizList.delete({id}).exec();
                return deleteInfo.toString();
            default:
                return "collection is not found";
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