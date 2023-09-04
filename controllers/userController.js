const { User } = require('../models');

const userController = {
// gets all users
  getUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbuserData => res.json(dbuserData))
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      });
  },

// gets single user by ID
getSingleUser({ params }, res) {
  User.findOne({ _id: params.id })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
      .then(dbuserData => {
        if (!dbuserData) {
          res.status(404).json({ message: 'No users with this ID' });
          return;
        }
        res.json(dbuserData);
      })
      .catch(error => {
        console.log(error);
        res.status(400).json(error);
      });
  },

//  adds user
addUser({ body }, res) {
  User.create(body)
    .then(dbuserData => res.json(dbuserData))
    .catch(error => res.status(400).json(error));
},


//  updates user
  updateUser({ params, body }, res) {
    user.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbuserData => {
        if (!dbuserData) {
          res.status(404).json({ message: 'No users with this ID' });
          return;
        }
        res.json(dbuserData);
      })
      .catch(error => res.status(400).json(error));
  },

// removes user
  removeUser({ params }, res) {
    user.findOneAndDelete({ _id: params.id })
      .then(dbuserData => {
        if (!dbuserData) {
          res.status(404).json({ message: 'No users with this ID' });
          return;
        }
        res.json(dbuserData);
      })
      .catch(error => res.status(400).json(error));
  },

//  adds friend
  addFriend({ params, body }, res) {
    user.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then(dbuserData => {
        if (!dbuserData) {
          res.status(404).json({ message: 'No users with this ID' });
          return;
        }
        res.json(dbuserData);
      })
      .catch(error => res.json(error));
  },

  // removes friend
  removeFriend({ params }, res) {
    user.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } } ,
      { new: true }
    )
      .then(dbuserData => {
        if (!dbuserData) {
          res.status(404).json({ message: 'No users with this ID' });
          return;
        }
        res.json(dbuserData);
      })
      .catch(error => res.json(error));
  }
};

module.exports = userController;