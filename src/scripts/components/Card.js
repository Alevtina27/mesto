export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    // Добавим данные

    this._photoElement = this._element.querySelector(".cards__photo");
    this._titleElement = this._element.querySelector(".cards__title");

    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    this._titleElement.textContent = this._name;


    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._photoElement.addEventListener("click", this._handleCardClick);

    this._likeBtn = this._element.querySelector(".cards__like");
    this._deleteBtn = this._element.querySelector(".cards__delete");

    this._likeBtn.addEventListener("click", () => {
      this._likeCard();
    });

    this._deleteBtn.addEventListener("click", () => {
      this._deleteCard();
    });
  }
  _likeCard() {
    this._likeBtn.classList.toggle("cards__like_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
