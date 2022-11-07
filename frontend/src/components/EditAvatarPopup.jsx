import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avaRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avaRef.current.value });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="avatar"
      title="Обновить аватар"
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        ref={avaRef}
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__field popup__field_top"
        name="avatar"
        id="avatar-url-input"
      />
    </PopupWithForm>
  );
}
