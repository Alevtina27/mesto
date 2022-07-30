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
      profileAvatar: this._profileAvatar.src,
    };
    return this._userInfo;
  }

  setUserInfo(newData) {
    this._userName.textContent = newData.userName;
    this._infoStatus.textContent = newData.infoStatus;
    this._profileAvatar.src = newData.profileAvatar;
  }
}
