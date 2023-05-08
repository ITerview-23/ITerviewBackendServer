import userService from "../../service/userService.js";

const resolvers = {
    Query: {
        async getUserInfo(parent, args){
            const {userId} = args;
            return await userService.getInstance().getUserInfo(userId);
        }
    },
    Mutation: {
        async updateUserInfo(parent, args){
            const {userId, userName} = args;
            let userInfo = await userService.getInstance().updateUserInfo(userId, userName);
            if(userInfo == null)
                throw new Error("유저 아이디가 없습니다.")
            return userInfo
        }
    }
}

export default resolvers;