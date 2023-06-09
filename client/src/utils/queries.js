import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      skills
    }
  }
`;

export const QUERY_LOBBIES = gql`
  query lobbies {
    lobbies {
      _id
      createdAt
      host
      status
      topic
      teamA
      teamB
      admin
    }
  }
`;

export const QUERY_MESSAGES = gql`
query messages($lobby: String!) {
  messages(lobby: $lobby) {
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