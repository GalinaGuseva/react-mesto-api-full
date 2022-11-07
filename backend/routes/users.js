const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  getUserId,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { valId, valUpdateUser, valNewAvatar } = require('../middlewares/validation');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:_id', valId, getUserId);
router.patch('/users/me', valUpdateUser, updateUser);
router.patch('/users/me/avatar', valNewAvatar, updateAvatar);

module.exports = router;
