import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupBigImage = this._popup.querySelector(".popup__image");
    this._popupName = this._popup.querySelector(".popup__caption");
  }
  open(name, link) {
    super.open();
    this._popupBigImage.src = link;
    this._popupName.textContent = name;
    this._popupBigImage.alt = name;
  }
  
}
