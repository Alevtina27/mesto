export default class Api{
  constructor(options){
    this._host = options.host;
    this._token = options.token;
  }

  _getJsonOrError(res){
    if (res.ok){
        return res.json();
    }

    throw new Error('Ошибка при загрузке данных');
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
createCard(name){
  return fetch(`${this._host}/tasks`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({name}),
  })
  .then(this._getJsonOrError)
}
}
