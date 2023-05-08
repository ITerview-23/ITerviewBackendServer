import userService from "../../service/userService.js";

const resolvers = {
    Query: {
        async getUserInfo(parent, args){
            const {userId} = args;
            return await userService.getInstance().getUserInfo(userId);
        }
    },
}

export default resolvers;