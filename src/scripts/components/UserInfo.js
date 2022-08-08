export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }
  getUserInfo() {
    this._userInfo = {
      name:  this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    };
    return this._userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
   this._avatar.src = data.avatar;
  }

}
