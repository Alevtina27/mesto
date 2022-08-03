export default class Card {
  constructor(data, cardSelector, handleCardClick, handleBinClick, handleFormReset, userId, handleAddLike, handleDeleteLike) {
    this._link = data.link;
    this._name = data.name;
    this._cardId = data._id;
    this._like = data.like;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleBinClick = handleBinClick;
    this._handleFormReset = handleFormReset;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
   // this._deleteCard = this._deleteCard.bind(this);
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
    this._likeBtn = this._element.querySelector(".cards__like");

    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
  id(){
    return this._cardId;
  }

  _setEventListeners() {
    this._deleteBtn = this._element.querySelector(".cards__delete");
    this._photoElement.addEventListener("click", this._handleCardClick);
    this._deleteBtn.addEventListener("click", this._handleBinClick);

    //this._likeBtn = this._element.querySelector(".cards__like");


    this._likeBtn.addEventListener("click", () => {
      if(this._likeBtn.classList.contains("cards__like_active")){
        this._handleDeleteLike(this._cardId);
      } else {
        this._handleAddLike(this._cardId);
      }
    });


    this._deleteBtn.addEventListener("click", () => {
      this._handleFormReset(this._cardSelector.id)
    });
    //this._deleteBtn.addEventListener("click", this._deleteCard);
  }

  handleLikesOfCard(data){
    this._like = data.like;
    this._likeCounter.textContent = this._like.length;
    this._likeBtn.classList.toggle("cards__like_active");
  }

  /**_likeCard() {
    this._likeBtn.classList.toggle("cards__like_active");
  }*/

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
  /**async _deleteCard(evt){
    try{
        evt.preventDefault();
        await this._handleFormReset(this._cardSelector.id);
        this._element.remove();
    }
    catch(error){
        console.log(error);
    }
}*/
}
