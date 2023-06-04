import {gql} from "apollo-server-express";

const typeDefs = gql`
    type Query {
        "퀴즈 가져오기"
        getQuiz(quizListId: Int!, userId: String!): Quiz!
        "version2 퀴즈 가져오기"
getQuizV2(quizListId: Int!, userId: String!): NewQuiz!
        "정답 확인"
        checkAnswer(quizId: Int!, answer: [String!]!, userId: String): Boolean!
        "정답 가져오기"
        getAnswer(quizId: Int!): [String!]!
        "일일 퀴즈 가져오기"
        getDailyQuiz(userId: String!): Quiz!
        "퀴즈 리스트 가져오기"
        getQuizList(quizListId: Int!, userId: String!): [Quiz]!
    }
    
    type NewQuiz {
        "퀴즈 내용"
        quizInfo: String!
        "퀴즈 번호"
        quizId: Int!
        "과거 정답 여부"
        correct: Int!
        "정답 개수"
        answerNum: Int!
    }

    "퀴즈 정보"
    type Quiz {
        "퀴즈 내용"
        quizInfo: [String]!
        "퀴즈 번호"
        quizId: Int!
        "과거 정답 여부"
        correct: Int!
    }
`;

export default typeDefs;
