import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._popupBigImage = this._popup.querySelector('.popup__image');
    this._popupName = this._popup.querySelector('.popup__caption');
  }
  open(data){
    super.open();
    this._popupBigImage.src = data.src;
    this._popupName.textContent = data.alt;
    this._popupBigImage.alt = data.alt;
  }
}

