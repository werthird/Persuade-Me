const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    skills: [String]!
  }

  type Message {
    _id: ID
    author: String!
    lobby: String!
    role: String!
    timestamp: String
    contents: String!
    sources: [String]
  }

  type Lobby {
    _id: ID
    createdAt: String
    host: ID
    status: String
    topic: String
    teamA: [String]
    teamB:[String]
    admin:[String]
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    lobbies: [Lobby]!
    messages(lobby: String!): [Message]!
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile: Profile
    removeSkill(skill: String!): Profile

    sendMessage(lobby: ID!, author: String!, role: String!, contents: String!, sources: [String]): Profile
    addLobby(host: ID!, topic: String!): Auth
  }
`;

module.exports = typeDefs;
