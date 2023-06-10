import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_SKILL = gql`
  mutation removeSkill($skill: String!) {
    removeSkill(skill: $skill) {
      _id
      name
      skills
    }
  }
`;

export const ADD_LOBBY = gql`
  mutation AddLobby($host: String!, $topic: String!) {
    addLobby(host: $host, topic: $topic) {
      token
    }
  }
`;

export const ADD_STAFF = gql`
mutation addStaff($lobby: String!, $role: String!, $user: String!) {
  addStaff(lobby: $lobby, role: $role, user: $user) {
    teamB
    teamA
    admin
  }
}
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($lobby: String!, $author: String!, $role: String!, $contents: String!) {
    sendMessage(lobby: $lobby, author: $author, role: $role, contents: $contents) {
      _id
      author
      lobby
      role
      timestamp
      contents
      sources
    }
  }
`;