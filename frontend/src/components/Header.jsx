import React from "react";
import logo from "../images/logo.svg";
import { Routes, Route, Link } from "react-router-dom";

export default function Header({ isLoggedIn, onSignOut, email }) {
  const [isClickBurgerMenu, setIsClickBurgerMenu] = React.useState(false);

  const handleClickBurgerMenu = (e) => {
    setIsClickBurgerMenu(!isClickBurgerMenu);
  };

  return (
    <header className={`${isLoggedIn ? "header header__mobile" : "header"}`}>
      <img src={logo} alt="лого" className="header__logo" />

      <Routes>
        <Route
          path="/signin"
          element={
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/signup"
          element={
            <Link to="/signin" className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          exact
          path="/"
          element={
            isLoggedIn ? (
              <>
                <button
                  className="header-burger"
                  onClick={handleClickBurgerMenu}
                >
                  <span
                    className={`${
                      isClickBurgerMenu
                        ? "header-burger__line"
                        : "header-burger__line header-burger__line_active"
                    }`}
                  ></span>
                  <span
                    className={`${
                      isClickBurgerMenu
                        ? "header-burger__line"
                        : "header-burger__line header-burger__line_active"
                    }`}
                  ></span>
                  <span
                    className={`${
                      isClickBurgerMenu
                        ? "header-burger__line"
                        : "header-burger__line header-burger__line_active"
                    }`}
                  ></span>
                </button>
                <div
                  className={`${
                    isClickBurgerMenu
                      ? "header__menu header__menu_inactive"
                      : "header__menu"
                  }`}
                >
                  <p className="header__email">{email} </p>
                  <Link
                    to="/signin"
                    className="header__link header__link_menu"
                    onClick={onSignOut}
                  >
                    Выйти
                  </Link>
                </div>
              </>
            ) : null
          }
        />
      </Routes>
    </header>
  );
}
