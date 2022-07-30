import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormReset, handleBinClick) {
    super(popupSelector);
    this._handleFormReset = handleFormReset;
    this._formDelete = this._popup.querySelector(".popup__card-delete");
    this._deleteBtn = document.querySelector(".cards__delete");
    this._handleBinClick = handleBinClick;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formDelete.addEventListener("reset", (evt) => {
      evt.preventDefault();
      //this._handleFormReset(this._deleteCard());
      this._deleteBtn.addEventListener("click", () => {
        this._handleBinClick(this._deleteCard());
      });
      //this._deleteBtn.addEventListener("click", this._handleBinClick);
      this.close();
    });
  }

  close() {
    super.close();

  }
}
