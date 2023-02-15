import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation createFriendRequest($recipient: ID!) {
  createFriendRequest(recipient: $recipient)
}`;

export const DECLINE_FRIEND = gql`
mutation ignoreFriendRequest($id: ID!) {
  ignoreFriendRequest(_id: $id)
}`;

export const ACCEPT_FRIEND = gql`
mutation acceptFriendRequest($id: ID!) {
  acceptFriendRequest(_id: $id)
}`;

export const ADD_CHALLENGE = gql`
mutation addChallenge($inviteeId: ID!, $challengerWord: String!) {
  createChallenge(inviteeId: $inviteeId, challengerWord: $challengerWord)
}`;

export const ACCEPT_CHALLENGE = gql`
mutation acceptChallenge($id: ID!, $inviteeWord: String!) {
  acceptChallenge(_id: $id, inviteeWord: $inviteeWord)
}`;

export const DECLINE_CHALLENGE = gql`
mutation ignoreChallenge($id: ID!) {
  ignoreChallenge(_id: $id)
}`;


