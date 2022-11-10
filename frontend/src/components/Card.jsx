import React from "react";
import trashTop from "../images/trash-top.svg";
import trashBottom from "../images/trash-bottom.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  const handleClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);

  return (
    <div className="photo-card">
      {isOwn && (
        <button
          type="button"
          className="photo-card__btn-delete"
          title="Удалить"
          onClick={handleDeleteClick}
        >
          <div className="photo-card__trash">
            <img
              src={trashTop}
              alt="корзина-верх"
              className="photo-card__delete-top"
            />
            <img
              src={trashBottom}
              alt="'корзина-низ"
              className="photo-card__delete"
            />
          </div>
        </button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="photo-card__image"
        onClick={handleClick}
      />
      <div className="photo-card__caption">
        <h2 className="photo-card__text">{card.name}</h2>
        <div className="photo-card__container-like">
          <button
            type="button"
            className={`photo-card__like ${
              isLiked ? "photo-card__like_active" : ""
            }`}
            title="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="photo-card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
