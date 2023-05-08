import user from "../model/user.js";
import user_quiz from "../model/user_quiz.js";
class UserService{
    async getUserInfo(userId) {
        let userInfo = await user.findOne({userId: userId}).exec();
        if (userInfo === null) {
            userInfo = new user(
                {
                    userId: userId,
                    userName: "임시" + Math.floor(Math.random() * 1000),
                }
            )
            await userInfo.save();
        }
        let correctWrongCount = await this.getCorrectWrongCount(userId);
        return {
            userId: userInfo.userId,
            userName: userInfo.userName,
            correct_quiz_count: correctWrongCount.correctCount,
            wrong_quiz_count: correctWrongCount.wrongCount
        }
    }

    async updateUserInfo(userId, userName) {
        let userInfo = await user.findOne({userId: userId}).exec();
        if(userInfo === null)
            return null;
        userInfo.userName = userName;
        await userInfo.save();
        let correctWrongCount = await this.getCorrectWrongCount(userId);
        return {
            userId: userInfo.userId,
            userName: userInfo.userName,
            correct_quiz_count: correctWrongCount.correctCount,
            wrong_quiz_count: correctWrongCount.wrongCount
        }
    }

    async getCorrectWrongCount(userId) {
        let quizInfo = await user_quiz.find({userId: userId}).exec();
        let correctCount = 0;
        let wrongCount = 0;
        for (let i = 0; i < quizInfo.length; i++) {
            if (quizInfo[i].correct)
                correctCount++;
            else
                wrongCount++;
        }
        return {
            correctCount: correctCount,
            wrongCount: wrongCount,
        }
    }

    /**
     * @return {UserService}
     */
    static getInstance(){
        if(!UserService.instance)
            UserService.instance = new UserService();
        return UserService.instance;
    }
}

export default UserService;