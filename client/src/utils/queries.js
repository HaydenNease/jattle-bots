import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($term: String!) {
    searchUsers(term: $term) {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query user {
    me {
      _id
      username
      challenges {
        _id
        inviteeId {
          username
        }
      }
      friendRequests {
        _id
        requestor {
          _id
          username
        }
        recipient {
          _id
          username
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;

// export const FIND_USERS = gql`
// query findAllUsers {
//   users {
//     _id
//     username
//     friends {
//       username
//     }
//     friendRequests {
//       _id
//     }
//     challenges {
//       _id
//       challengerWord
//       inviteeWord
//       status
//     }
//   }  
// }`;