import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/UseForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const inputValues = { userName: "", userJob: "" };
  const { values, setValues, handleChange } = useForm(inputValues);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser && isOpen) {
      setValues({ userName: currentUser.name, userJob: currentUser.about });
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.userName,
      about: values.userJob,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Введите имя"
        className="popup__field popup__field_top"
        name="userName"
        id="name-input"
        value={values.userName}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="О себе"
        className="popup__field"
        name="userJob"
        id="job-input"
        value={values.userJob}
        onChange={handleChange}
      />
    </PopupWithForm>
  );
}
