import {gql} from "apollo-server-express";

const typeDefs = gql`
    type Query {
        "db 값 가져오기"
        getDB(collection: String!, id: String!): String!
        getQuizList(quizListId: Int, name: String, description: String, image: String): [QuizList]!
        getQuiz(quizType: String, quizId: Int, quizInfo: String): [Quiz]!
    }
    
    type Mutation {
        "quizList db 값 추가하기"
        addQuizListDBInfo(quizListId: Int!, name: String!, description: String!, image: String!): QuizList!
        "quiz db 값 추가하기"
        addQuizDBInfo(quizType: String!, quizId: Int!, quizInfo: String!, answer: String!): Quiz!
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
        answer: String!
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
    "입력 퀴즈 정보"
    input QuizInput {
        _id: ID
        quizType: String
        quizId: Int
        quizInfo: String
        answer: String
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
    
    "db 입력 정보"
    input InputInfo {
        key: String!
        value: String!
    }
`;

export default typeDefs;
