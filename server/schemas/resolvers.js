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
      const user = await User.create(args);
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
      const request = await Request.create(
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

    updateFriendStatus: async (_, { friendId, status }, context) => {
      const request = await Request.findOneAndUpdate
    }
  }
};

module.exports = resolvers;
