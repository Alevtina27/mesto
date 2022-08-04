export default class Api{
  constructor(options){
    this._url = options.host;
    this._token = options.headers;
  }

  _getJsonOrError(res){
    if (res.ok){
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    //throw new Error('Ошибка при загрузке данных');
}
_getHeaders(){
  return {
      authorization: this._token,
      'content-type': 'application/json',
  }
}

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._token,

  })
  .then(this._getJsonOrError);
}
getUserInfo(){
  return fetch(`${this._url}/users/me`, {
    headers: this._token,

})
.then(this._getJsonOrError);
}

addCard(data) {
  return fetch(`${this._url}/cards`, {
    method: 'POST',
    headers: this._token,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
    .then(res => this._parseResponse(res));
}

addLikes(id){
  return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._token,
  })
  .then(this._getJsonOrError)
}
removeLikes(id){
  return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._token,
  })
  .then(this._getJsonOrError)
}

editUserInfo(data) {
  return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: this._token,
    body: JSON.stringify({
      userName: data.userName,
      infoStatus: data.infoStatus
    })
  })
    .then(res => this._parseResponse(res));
}

changeAvatar(data) {
  return fetch(`${this._url}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._token,
    body: JSON.stringify({
      profileAvatar: data.profileAvatar
    })
  })
    .then(res => this._parseResponse(res));
}

removeCard(id){
  return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._token,
  })
  .then(this._getJsonOrError)
}
}



