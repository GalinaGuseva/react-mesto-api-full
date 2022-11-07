import React, { useState } from "react";
import api from "../utils/Api.js";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from "../utils/Auth";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "One moment...",
    about: "",
    avatar: "",
  });
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
    alt: "",
  });
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const tockenCheck = () => {
      if (!localStorage.getItem("jwt")) return;
      const jwt = localStorage.getItem("jwt");
      auth.getContent(jwt).then((res) => {
        if (res) {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate("/");
        }
      });
    };
    tockenCheck();
  }, [navigate]);

  const handleLogin = (data) => {
    return auth
      .login(data)
      .then((data) => {
        if (!data.token) return;
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setIsSuccess(false);
        setIsInfoPopupOpen(true);
      });
  };

  const handleRegister = (data) => {
    auth
      .register(data)
      .then((res) => {
        if (res) {
          setIsSuccess(true);
          setIsInfoPopupOpen(true);
          setTimeout(navigate("/signin"), 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoPopupOpen(true);
      });
  };

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/signin");
    setEmail("");
  }

  React.useEffect(() => {
    if (localStorage.getItem("jwt") && email) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
          navigate("/signin");
        })
        .finally(() => {
          setTimeout(showContent, 2000);
        });
    }
  }, [isLoggedIn]);

  const showContent = () => {
    setIsLoaded(true);
  };

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleEditAvatarClick(e) {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick(e) {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(e) {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEsc(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    if (
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      selectedCard ||
      isInfoPopupOpen
    ) {
      document.addEventListener("keydown", handleEsc);
    }
  });

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    document.removeEventListener("keydown", handleEsc);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header onSignOut={handleSignOut} isLoggedIn={isLoggedIn} email={email} />
      <Routes>
        <Route
          path="/signin"
          element={
            isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Register onRegister={handleRegister} />
            )
          }
        />
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute path="/" isLoggedIn={isLoggedIn}>
              <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                isLoaded={isLoaded}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddNewPlace={handleAddPlaceSubmit}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        isOpen={isInfoPopupOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
