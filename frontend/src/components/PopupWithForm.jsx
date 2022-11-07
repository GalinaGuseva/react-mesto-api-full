import React from "react";

export default function PopupWithForm(props) {
  return props.isOpen ? (
    <div
      className={`popup ${props.name}-popup ${props.isOpen && "popup_opened"}`}
      onClick={props.onClose}
    >
      <form
        name={`${props.name}`}
        className="popup__container"
        onSubmit={props.onSubmit}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          type="button"
          className="popup__btn-close"
          title="Закрыть"
          onClick={props.onClose}
        ></button>
        <h4 className="popup__title">{`${props.title}`}</h4>
        {props.children}
        <button
          type="submit"
          className="popup__btn-submit"
          title={`${props.buttonTitle}`}
        >{`${props.buttonTitle}`}</button>
      </form>
    </div>
  ) : null;
}
