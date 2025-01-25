// controllers/friendController.js
const Friendships = require('../models/friendModel');
const Users = require('../models/userModel');

const FriendController = {
  sendRequest: async (req, res) => {
    const userId1 = req.user.id; // Current user's ID from auth middleware
    const { userId2 } = req.body; // ID of the user to send request to

    try {
      const existingRequest = await Friendships.findOne({
        where: {
          userId1: userId1,
          userId2: userId2,
        }
      });

      if (existingRequest) {
        return res.status(400).json({ error: 'Friend request already sent.' });
      }

      const newRequest = await Friendships.create({ userId1, userId2 });
      res.status(201).json(newRequest);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send friend request.' });
    }
  },

  getFriends: async (req, res) => {
    const userId = req.user.id; // Current user's ID

    try {
      const friends = await Friendships.findAll({
        where: {
          [Op.or]: [
            { userId1: userId, status: 'accepted' },
            { userId2: userId, status: 'accepted' }
          ]
        },
        include: [
          {
            model: Users,
            as: 'user1', // Alias for userId1
            attributes: ['id', 'username', 'email']
          },
          {
            model: Users,
            as: 'user2', // Alias for userId2
            attributes: ['id', 'username', 'email']
          }
        ]
      });
      res.json(friends);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch friends.' });
    }
  },
};

module.exports = FriendController;