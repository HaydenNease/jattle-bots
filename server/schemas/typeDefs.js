const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String! 
    createdAt: String   
    friends: [User]
    friendRequests: [User]
    challenges: [Challenge]
    
  }

  type Challenge {
    _id: ID!
    challengerId: User
    inviteeId: User
    word: String!
    status: Int!
  }

  type Request {
    _id: ID!
    requestor: ID!,
    recepient: ID!,
    status: Int
  }

  type Game {
    _id: ID!
    word: String!
    guess1: String
    guess2: String
    guess3: String
    guess4: String
    guess5: String
    guess6: String
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
    
    updateFriendStatus(
      friendId:ID!
      status: Int
    ):User

    addChallenge(
      challenger:ID!, 
      invitee:ID!, 
      status:Int!, 
    ): Challenge 
  }
`;

module.exports = typeDefs;
