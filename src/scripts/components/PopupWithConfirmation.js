import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleRemoveCard) {
    super(popupSelector);
   this._handleRemoveCard = handleRemoveCard;
    this._formDelete = this._popup.querySelector(".popup__card-delete");
  }

  confirmationHandler(card, data){
    this._card = card;
    this._data = data;
    super.open();
    }
   /* confirmationHandler(removing){
      this._handleRemoveCard = removing;
      super.open();
      }*/

  setEventListeners() {
    super.setEventListeners();
    this._formDelete.addEventListener("submit", (evt) => {
      evt.preventDefault();
     // this._handleRemoveCard(this._card, this._data);
    });
  }
  close() {
    super.close();

  }
}
