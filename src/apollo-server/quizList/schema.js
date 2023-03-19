import {gql} from "apollo-server-express";

const typeDefs = gql`
    extend type Query {
        "퀴즈 주제 리스트"
        getListOfSubject: [QuizList]!
    }
#    type Mutation {
#        "환율등록, src, tgt, date에 대해서 upsert"
#        postExchangeRate(info: InputUpdateExchangeInfo): ExchangeInfo
#        "환율삭제, 해당일자의 해당 통화간 환율을 삭제"
#        deleteExchangeRate(info: InputDeleteExchangeInfo): ExchangeInfo
#    }
    "퀴즈 정보"
    type QuizList{
        "이름"
        name: String!
        "quizId"
        quizListId: Int!
        "description"
        description: String!
        "이미지"
        Image: String!
    }
`;

export default typeDefs;