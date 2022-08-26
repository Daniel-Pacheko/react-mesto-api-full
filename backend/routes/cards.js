const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const {
  getCards, createCard, deleteCard, likeCard, removeLikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((v) => {
      if (!isURL(v)) {
        throw new Error('URL validation err');
      }
      return v;
    }),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).required(),
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).required(),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).required(),
  }),
}), removeLikeCard);

module.exports = router;
