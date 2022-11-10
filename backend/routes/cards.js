const router = require('express').Router();
const { valNewCard, valId } = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', valNewCard, createCard);
router.delete('/cards/:cardId', valId, deleteCard);
router.put('/cards/:cardId/likes', valId, likeCard);
router.delete('/cards/:cardId/likes', valId, dislikeCard);

module.exports = router;
