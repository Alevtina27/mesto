import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormReset) {
    super(popupSelector);
    this._handleFormReset = handleFormReset;
    this._formDelete = this._popup.querySelector(".popup__card-delete");
  }

  setEventListeners() {
    super.setEventListeners();
    this._formDelete.addEventListener("reset", (evt) => {
      evt.preventDefault();
      //this._handleFormReset(this._deleteCard());
      this.close();
    });
  }
  close() {
    super.close();
    this._formDelete.reset();
  }
}
