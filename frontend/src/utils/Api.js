class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }
  //Получение ответа от сервера
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }

  // Загрузка данных профиля с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }

  //Редактирование профиля
  editUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then((res) => this._getResponse(res));
  }

  //Обновление аватара пользователя
  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._getResponse(res));
  }

  // Добавление новой карточки
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._getResponse(res));
  }

  // Удаление карточки
  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }

  //Постановка и снятие лайка
  toggleLikeCard(cardId, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method,
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }
}
const apiOptions = {
  url: "https://mesto.nomoreparties.co/v1/cohort-47",
  headers: {
    authorization: "3b67ac11-b29e-4182-9110-a6f8ab5d8b17",
    "Content-Type": "application/json",
  },
};

const api = new Api(apiOptions);

export default api;
