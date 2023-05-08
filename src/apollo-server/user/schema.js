import {gql} from "apollo-server-express";

const typeDefs = gql`
    type Query {
        "퀴즈 주제 리스트"
        getUserInfo(userId: String!): UserInfo!
    }
    "퀴즈 정보"
    type UserInfo{
        "이름"
        userName: String!
        "id"
        userId: String!
        "맞춘 문제 수"
        correct_quiz_count: Int!
        "틀린 문제 수"
        wrong_quiz_count: Int!
    }
`;

export default typeDefs;