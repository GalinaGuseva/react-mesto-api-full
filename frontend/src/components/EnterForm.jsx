import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/UseForm";

export default function EnterForm(props) {
  const initValues = { emailInput: "", passwordInput: "" };
  const { values, setValues, handleChange } = useForm(initValues);

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      email: values.emailInput,
      password: values.passwordInput,
    });
    setValues(values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      name={props.name}
      className="enter"
      noValidate
    >
      <h2 className="enter__title">{props.title}</h2>
      <input
        value={values.emailInput}
        onChange={handleChange}
        name="emailInput"
        type="email"
        className="enter__input"
        placeholder="email@mail.com"
        required
      />
      <input
        value={values.passwordInput}
        onChange={handleChange}
        name="passwordInput"
        type="password"
        className="enter__input"
        placeholder="••••••••••"
        required
      />
      <button type="submit" className="enter__submit-btn">
        {props.buttonTitle}
      </button>
      <p className="enter__text">
        {props.regText}
        <Link to="/signin" className="enter__link">
          {props.regLink}
        </Link>
      </p>
    </form>
  );
}
