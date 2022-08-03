export default class UserInfo {
  constructor({ userName, infoStatus, profileAvatar }) {
    this._userName = userName;
    this._infoStatus = infoStatus;
    this._profileAvatar = profileAvatar;
  }
  getUserInfo() {
    this._userInfo = {
      userName: this._userName.textContent,
      infoStatus: this._infoStatus.textContent,
      //profileAvatar: this._profileAvatar.src
    };
    return this._userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.userName;
    this._infoStatus.textContent = data.infoStatus;
    this._profileAvatar.src = data.profileAvatar;
  }
}
