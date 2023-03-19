import quizList from "../model/quizList.js";

const resolvers = {
    Query: {
        getListOfSubject(){
            return quizList.find().exec();
        }
    },
    // Mutation: {
    //     postExchangeRate(root, {info}){
    //         // date 가 없으면, 최신일자로 등록
    //         info.date = info.date || new Date().toISOString().slice(0, 10);
    //         // upsert
    //         let query = {src: info.src, tgt: info.tgt, date: info.date};
    //         return ExchangeInfo.findOneAndUpdate(query, info, {upsert: true}).exec();
    //     },
    //     deleteExchangeRate(root, {info}){
    //         let query = {src: info.src, tgt: info.tgt, date: info.date};
    //         return ExchangeInfo.findOneAndDelete(query).exec();
    //     }
    // }
}

export default resolvers;