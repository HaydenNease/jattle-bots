const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    createdAt: Date
    friends: [User]
    challenges: [Challenge]
    games: [Game]
  }

  type Challenge {
    _id: ID!
    challengerId: User
    inviteeId: User
    word: String!
    status: Int!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(id: ID!): User
    searchUsers(term: String!): [User]!
    me: User
  }

  type Mutation {
    addUser(
      email:String!, 
      username:String!, 
      password:String!
    ): Auth

    login(
      email:String!, 
      password:String!
    ): Auth

    requestFriend(
      friendId:ID!,
      status: Int
      ): User
      
    addChallenge(
      challenger:ID!, 
      invitee:ID!, 
      status:Int!, 
    ): Challenge 
  }
`;

module.exports = typeDefs;
