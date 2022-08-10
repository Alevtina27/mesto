import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._formDelete = this._popup.querySelector(".popup__card-delete");
  }

  confirmationHandler(removing) {
    this._handleRemoveCard = removing;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formDelete.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleRemoveCard();
      this.close();
    });
  }
  close() {
    super.close();
  }
}
