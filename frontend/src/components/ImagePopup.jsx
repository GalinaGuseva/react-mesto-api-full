import React from "react";

export default function ImagePopup({ card, onClose }) {
  return card ? (
    <div
      className={`popup photo-popup ${card.name && "popup_opened"}`}
      onClick={onClose}
    >
      <figure
        className="photo-popup__container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img src={card.link} alt={card.name} className="photo-popup__image" />
        <figcaption className="photo-popup__caption">{card.name}</figcaption>
        <button
          type="button"
          className="popup__btn-close"
          title="Закрыть"
          onClick={onClose}
        ></button>
      </figure>
    </div>
  ) : null;
}
