import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/UseForm";

export default function AddPlacePopup(props) {
  const initValues = { caption: "", link: "" };
  const { values, setValues, handleChange } = useForm(initValues);

  React.useEffect(() => {
    if (props.isOpen) {
      setValues({ name: "", link: "" });
    }
  }, [props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddNewPlace({ name: values.caption, link: values.link });
  };

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Название"
        className="popup__field popup__field_top"
        name="caption"
        id="text-input"
        value={values.caption || ""}
        onChange={handleChange}
      />
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__field"
        name="link"
        id="url-input"
        value={values.link || ""}
        onChange={handleChange}
      />
    </PopupWithForm>
  );
}
