export const BASE_URL = "https://auth.nomoreparties.co";

const request = ({ url, method = "POST", token, data }) => {
  return fetch(`${BASE_URL}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка ${res.status}`));
  });
};

export function register({ email, password }) {
  return request({
    url: "/signup",
    data: { email, password },
  });
}

export function login({ email, password }) {
  return request({
    url: "/signin",
    data: { email, password },
  });
}

export function getContent(token) {
  return request({
    url: "/users/me",
    method: "GET",
    token,
  });
}
