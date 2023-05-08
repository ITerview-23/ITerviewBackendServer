import {gql} from "apollo-server-express";

const typeDefs = gql`
    type Query {
        "유저 정보"
        getUserInfo(userId: String!): UserInfo!
    }
    type Mutation {
        "유저 이름 수정"
        updateUserInfo(userId: String!, userName: String!): UserInfo!
    }
    "유저 정보"
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