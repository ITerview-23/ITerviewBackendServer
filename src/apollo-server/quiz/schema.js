import {gql} from "apollo-server-express";

const typeDefs = gql`
    type Query {
        "퀴즈 가져오기"
        getQuiz(quizListId: Int!, userId: String!): Quiz!
        "정답 확인"
        checkAnswer(quizId: Int!, answer: [String!]!): Boolean!
        "정답 가져오기"
        getAnswer(quizId: Int!): [String!]!
    }

    "퀴즈 정보"
    type Quiz {
        "퀴즈 내용"
        quizInfo: [String]!
        "퀴즈 번호"
        quizId: Int!
    }
`;

export default typeDefs;
