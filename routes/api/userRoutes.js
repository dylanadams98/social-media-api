const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  removeUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router
  .route('/')
  .get(getUsers)
  .post(addUser);

// /api/users/:id
router
  .route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(removeUser);

// api/users/:id/friends/:friendId
  router
  .route('/:id/friends/:friendId').
  post(addFriend);

// api/users/:id/friends/:friendId
  router
  .route('/:id/friends/:friendId')
  .delete(removeFriend);

module.exports = router;