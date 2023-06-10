const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auth {
    token: ID!
    profile: Profile
  }

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

  
  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    lobbies: [Lobby]!
    messages(lobby: String!): [Message]!
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addProfile(name: String!, email: String!, password: String!): Auth
    removeProfile: Profile

    addLobby(host: String!, topic: String!): Auth
    addStaff(lobby: String!, role: String!, user: String!): Lobby

    sendMessage(lobby: String!, author: String!, role: String!, contents: String!, sources: [String]): Message
  }
`;

module.exports = typeDefs;
