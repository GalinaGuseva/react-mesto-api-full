const { celebrate, Joi } = require('celebrate');

const patternUrl = /^https?:\/\/(w{3}\.)?[-\w]+\.([-\w'()!;@:%+.~#?&=/]*)/;

const register = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(patternUrl),
  }),
});

const signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const valUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const valNewAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(patternUrl),
  }),
});

const valNewCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(patternUrl),
  }),
});

const valId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  register,
  signin,
  valUpdateUser,
  valNewAvatar,
  valNewCard,
  valId,
};
