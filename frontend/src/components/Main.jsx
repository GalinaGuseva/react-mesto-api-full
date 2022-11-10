import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__image"
          />
          <button
            type="button"
            onClick={onEditAvatar}
            className="profile__edit-avatar-button"
          ></button>
          <div className="profile__text-block">
            <div className="profile__text-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                onClick={onEditProfile}
                className="profile__edit-button"
                title="Редактировать"
              ></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          className="profile__add-button"
          title="Добавить фото"
        ></button>
      </section>

      <section className="photos" aria-label="Фотографии мест">
        <ul className="photos__list">
          {cards.map((card) => {
            return(            
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );     
          })}
        </ul>
      </section>
    </main>
  );
}
