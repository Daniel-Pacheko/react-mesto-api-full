class Api {
  constructor(options) {
    this._baseUrl = options.url;
    this._headers = options.headers;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._checkResult(res))
  }

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(res => this._checkResult(res))
  }

  setUserProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
      .then(res => this._checkResult(res))
  }



  
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then((res) => this._checkResult(res))
  }


  setCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then((res) => this._checkResult(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._checkResult(res));
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._checkResult(res))
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._checkResult(res))
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this.addLike(id) : this.removeLike(id);
  }

}

const api = new Api({
  url: 'https://danielpacheko.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;