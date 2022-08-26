export const BASE_URL = 'https://danielpacheko.nomoredomains.sbs';

const checkResult = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "email": email, "password": password })
  })
    .then(checkResult)
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "email": email, "password": password })
  })
    .then(checkResult)
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      return data;
    })
};


export const checkToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(checkResult);
};