const { AuthenticationError } = require('apollo-server-express');
const { Profile, Lobby, Message } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    //PROFILE QUERIES
    //ALL PROFILES
    profiles: async () => {
      return Profile.find();
    },
    //ONE PROFILE by ID
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    //MY PROFILE by context.id
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    //LOBBIES QUERIES
    lobbies: async () => {
      return await Lobby.find();
    },
    //MESSAGE QUERIES
    messages: async (parent, {lobby}) => {
      console.log(lobby)
      const messages = await Message.find({lobby: lobby})
      return messages
    }
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },
    addLobby: async (parent, { host, topic }) => {
      const lobby = await Lobby.create({ host, topic })
      return
    },
    //SEND MESSAGE MUTATION
    sendMessage: async (parent, { lobby, author, role, contents, sources }) => {
      sources = !sources ? sources : [];
      const newMessage = await Message.create({ author, lobby, role, contents, sources })
      return
    },
  },
};

module.exports = resolvers;
