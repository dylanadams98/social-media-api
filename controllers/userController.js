const { User } = require('../models');

const userController = {
// gets all users
  get_all_users(req, res) {
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
get_user_by_id({ params }, res) {
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
add_user({ body }, res) {
  User.create(body)
    .then(db_user_data => res.json(db_user_data))
    .catch(error => res.status(400).json(error));
},


//  updates user
  update_user({ params, body }, res) {
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
  remove_user({ params }, res) {
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
  add_friend({ params, body }, res) {
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
  remove_friend({ params }, res) {
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