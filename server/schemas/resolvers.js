const { AuthenticationError } = require('apollo-server-express');
const { User, Challenge, Game, Request } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    searchUsers: async (_parent, args) => {
      const search = args.term;
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
      const searchRgx = rgx(search);
      return User.find({
        $or: [
          {
            email: {
              $regex: searchRgx,
              $options: 'i',
            },
          },
          {
            username: {
              $regex: searchRgx,
              $options: 'i',
            }
          },
        ]
      });
    },
    users: async () => {
      return User.find();
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id });
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const user = await User.insertOne(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, username, password }) => {
      const user = await User.findOne(email ? { email } : { username });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    requestFriend: async (_, { recipient }, context) => {
      const request = await Request.insertOne(
        {
          requestor: context.user._id,
          recipient,
        }
      );
      await User.findOneAndUpdate(
        { _id: recipient }, 
        { $addToSet: {friendRequests: request._id} }
      );
      await User.findOneAndUpdate(
        { _id: context.user._id }, 
        { $addToSet: {friendRequests: request._id} }
      );
      return request;
    },

    acceptFriendRequest: async (_, { _id }, context) => {
      const request = await Request.findOne(
        { _id: request._id},
      );
      await User.findOneAndUpdate(
        { _id: context.user._id},
        { $addToSet: {friends: request.requestor} }
      );
      await User.findOneAndUpdate(
        { _id: request.requestor},
        { $addToSet: {friends: context.user._id} }
      )
    },

    addChallenge: async (_, { inviteeId, challengerWord }, context) => {
      const challenge = await Challenge.insertOne(
        {
          challengerId: context.user._id,
          inviteeId,
          challengerWord
        }
      );
    await User.findOneAndUpdate(
      { _id: context.user._id },
      { $addToSet:
      { challenges: challenge._id } }
    );
    await User.findOneAndUpdate(
      { _id: inviteeId },
      { $addToSet:
      {challenges: challenge._id } }
    );
    },

    challengeResponse: async (_, { _id, status, inviteeWord }, context) => {
      const response = await Challenge.findOneAndUpdate(
        { _id: challenge_id },
        { $addToSet: { inviteeWord } },
      )
    },
  }
};

module.exports = resolvers;
