import {gql} from "apollo-server-express";

const typeDefs = gql`
    type Query {
        getQuizList(quizListInfo: QuizListInput): [QuizList]!
        getQuiz(quizInfo: QuizInput): [Quiz]!
    }
    
    type Mutation {
        "quizList db 값 추가하기"
        addQuizListDBInfo(dbInfo: QuizListInputRequired!): QuizList!
        "quiz db 값 추가하기"
        addQuizDBInfo(dbInfo: QuizInputRequired!): Quiz!
        "quizList db 값 수정하기"
        updateQuizListDBInfo(updatedInfo: QuizListInput!, updateInfo: QuizListInput!): String!
        "quiz db 값 수정하기"
        updateQuizDBInfo(updatedInfo: QuizInput!, updateInfo: QuizInput!): String!
        "quizList db 값 삭제하기"
        deleteQuizListDBInfo(deletedInfo: QuizListInput!): String!
        "quiz db 값 삭제하기"
        deleteQuizDBInfo(deletedInfo: QuizInput!): String!
    }
    "퀴즈 정보"
    type Quiz {
        _id: ID!
        quizType: String!
        quizId: Int!
        quizInfo: String!
        answer: [AnswerSchema]!
        answerList: [[String!]!]!
    }
    "퀴즈 리스트 정보"
    type QuizList{
        _id: ID!
        "이름"
        name: String!
        "quizId"
        quizListId: Int!
        "description"
        description: String!
        "이미지"
        image: String!
    }
    "정답 정보"
    type AnswerSchema {
        key: String!
        value: [String!]!
    }
    
    "입력 퀴즈 정보"
    input QuizInput {
        _id: ID
        quizType: String
        quizId: Int
        quizInfo: String
        answer: [AnswerSchemaInput]
        answerList: [[String]]
    }
    "입력 퀴즈 리스트 정보"
    input QuizListInput{
        _id: ID
        "이름"
        name: String
        "quizId"
        quizListId: Int
        "description"
        description: String
        "이미지"
        image: String
    }
    "정답 정보"
    input AnswerSchemaInput {
        key: String
        value: [String]
    }
    "필수 입력 퀴즈 정보"
    input QuizInputRequired {
        quizType: String!
        quizId: Int!
        quizInfo: String!
        answer: [AnswerSchemaInput]!
        answerList: [[String!]!]!
    }
    "필수 입력 퀴즈 리스트 정보"
    input QuizListInputRequired{
        "이름"
        name: String!
        "quizId"
        quizListId: Int!
        "description"
        description: String!
        "이미지"
        image: String!
    }
`;

export default typeDefs;
