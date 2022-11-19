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
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }

  // Загрузка данных профиля с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }

  //Редактирование профиля
  editUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then((res) => this._getResponse(res));
  }

  //Обновление аватара пользователя
  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._getResponse(res));
  }

  // Добавление новой карточки
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._getResponse(res));
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }

  //Постановка и снятие лайка 
  likeCard(cardId) {     
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT", 
      credentials: 'include',
      headers: this._headers,
    })
    .then((res) => this._getResponse(res));
  } 

  disLikeCard(cardId) {     
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE", 
      credentials: 'include',
      headers: this._headers,
    })
    .then((res) => this._getResponse(res));
  }
  
  toggleLikeCardStatus(cardId, isLiked) { 
    if (!isLiked) {
      return this.likeCard(cardId);
    } else {
      return this.disLikeCard(cardId);
    }
  }   
}

const serverUrl = process.env.NODE_ENV === 'production' ? 'https://api.galamesto.students.nomoredomains.icu' : 'http://localhost:3001';

const api = new Api({
  url: serverUrl,
  headers: {    
    'Content-Type': 'application/json',
  },
});


export default api;
