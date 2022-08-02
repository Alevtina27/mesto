import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formDelete = this._popup.querySelector(".popup__card-delete");
  }

  submitCallback(remove){
    this._handleSubmit = remove;
}

  setEventListeners() {
    super.setEventListeners();
    this._formDelete.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      this.close();
    });
  }
  close() {
    super.close();

  }
}
