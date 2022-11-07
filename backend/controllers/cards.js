const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../middlewares/errors/not-found-err');
const BadRequestError = require('../middlewares/errors/bad-request-err');
const ForbiddenError = require('../middlewares/errors/forbidden-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  Card.create({ name: req.body.name, link: req.body.link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Карточка с таким id не найдена');
    })
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
      return card
        .remove()
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Карточка с таким id не найдена'));
        return;
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка с таким id не найдена');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неправильный id карточки'));
        return;
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка с таким id не найдена');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неправильный id карточки'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
