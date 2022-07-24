export default class UserInfo {
  constructor({userName, infoStatus}){
  this._userName = userName;
  this._infoStatus = infoStatus;
  }
  getUserInfo(){
     this._userInfo = {
      userName: this._userName.textContent,
      infoStatus: this._infoStatus.textContent,
    }
    return this._userInfo;
  }

  setUserInfo(newData){
  this._userName.textContent = newData.userName;
  this._infoStatus.textContent = newData.infoStatus;
}
}


