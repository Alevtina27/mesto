export default class Api{
  constructor(options){
    this._host = options.host;
    this._token = options.token;
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
    return fetch(`${this._host}/cards`, {
      headers: this._getHeaders(),

  })
  .then(this._getJsonOrError);
}
getUserInfo(){
  return fetch(`${this._host}/user`, {
    headers: this._getHeaders(),

})
.then(this._getJsonOrError);
}
createCard(data){
  return fetch(`${this._host}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
  })
  .then(this._getJsonOrError)
}

addCard(data) {
  return fetch(`${this._host}/cards`, {
    method: 'POST',
    headers: this._getHeaders(),
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
    .then(res => this._parseResponse(res));
}

addLikes(card){
  return fetch(`${this._host}/cards/${card}/like`, {
      method: 'PUT',
      headers: this._getHeaders(),
  })
  .then(this._getJsonOrError)
}
removeLikes(card){
  return fetch(`${this._host}/cards/${card}/like`, {
      method: 'DELETE',
      headers: this._getHeaders(),
  })
  .then(this._getJsonOrError)
}

editUserInfo(newData) {
  return fetch(`${this._host}/users/`, {
    method: 'PATCH',
    headers: this._getHeaders(),
    body: JSON.stringify({
      userName: newData.userName,
      infoStatus: newData.infoStatus
    })
  })
    .then(res => this._parseResponse(res));
}

changeAvatar(data) {
  return fetch(`${this._host}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._getHeaders(),
    body: JSON.stringify({
      profileAvatar: data.profileAvatar
    })
  })
    .then(res => this._parseResponse(res));
}

deleteCard(card){
  return fetch(`${this._host}/cards/${card}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
  })
  .then(this._getJsonOrError)
}
}



