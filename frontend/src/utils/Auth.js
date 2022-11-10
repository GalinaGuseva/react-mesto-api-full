const BASE_URL = process.env.NODE_ENV === 'development'
? 'http://localhost:3001'
: 'https://api.galamesto.students.nomoredomains.icu';

const request = ({ url, method = "POST", data }) => {
  return fetch(`${BASE_URL}${url}`, {
    method: method, 
    credentials: 'include',  
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),    
  })
    .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка ${res.status}`));
  });
};

export function register({ email, password }) {
  return request({
    url: '/signup',
    data: { email, password }    
  });
};

export function login({ email, password }) {
  return request({
    url: '/signin',
    data: { email, password }   
  });
};

export function logout() {
  return request({
    url: '/signout',     
  });
};
