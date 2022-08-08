export default class Card {
  constructor(data, cardSelector, handleCardClick, handleFormResetCard, userId, handleLikesOfCard,handleAddLike, handleRemoveLike) {
    this._link = data.link;
    this._name = data.name;
   this._likes = data.likes;
   this._cardId = data._id;
    this._userId = userId;
    //this._userId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleFormResetCard = handleFormResetCard;
    //this._handleLikesOfCard = handleLikesOfCard;
    this._handleAddLike = handleAddLike;
   this._handleRemoveLike = handleRemoveLike;
    //this._handleLikesOfCard = handleLikesOfCard;
    this._ownerId = data.owner._id;
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

    this._photoElement = this._element.querySelector(".cards__photo");
    this._titleElement = this._element.querySelector(".cards__title");
    this._likeBtn = this._element.querySelector(".cards__like");
    this._deleteBtn = this._element.querySelector(".cards__delete");
    this._counter = this._element.querySelector(".cards__counter");
    this._likeCounter = this._element.querySelector('.cards__like-counter')
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this._counter.textContent = this._likes.length;
    //this._handleLikesOfCard();
    this._cardLiked();
    this._holderOfCards();
    this._setEventListeners();

    return this._element;
  }



  _setEventListeners() {

    this._photoElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    //this._deleteBtn.addEventListener("click", this._handleBinClick);

   this._likeBtn.addEventListener('click', () => {
      if (this._likeBtn.classList.contains('cards__like_active')) {
        this._handleAddLike(this._cardId);
      } else {
        this._handleRemoveLike(this._cardId);
      }
    })

   /* this._likeBtn.addEventListener('click', () => {
     if(this._likeBtn.classList.toggle('cards__like_active')){
      this.handleLikeCard();
     }

    })*/

    this._deleteBtn.addEventListener("click", () => {
      this._handleFormResetCard(this._cardId)
    });
    //this._deleteBtn.addEventListener("click", this._deleteCard);
  }

  _holderOfCards(){
    if(this._ownerId === this._userId){
      this._deleteBtn.remove();
    }
}

_cardLiked(){
  this._likes.forEach((user) => {
   if( this._userId === user._id){
      this.addLikes();
   }else{
    this.deleteLikes();
   }
  })
}
addLikes(){
  this._likeBtn.classList.add('cards__like_active')
}
deleteLikes(){
  this._likeBtn.classList.remove('cards__like_active')
}

  /*_handleLikesOfCard(){
    this._likes.some(user => {
    if( this._userId === user._id){
      this.addLikes()
    } else {
      this.removeLikes()
    }
  })
    }*/

  handleLikeCard(data) {
    this._likes = data.likes;
    this._counter.textContent = this._likes.length;
    this._likeBtn.classList.toggle('cards__like_active');
  }

   /*addLikes(){
    if (this._likeBtn.classList.contains('cards__like_active')){
      this._likeBtn.classList.add('cards__like_active');
          this._counter.textContent = `${this._likes.length}`;
    }

  };

  removeLikes(){
    if (this._likeBtn.classList.contains('cards__like_active')){
      this._likeBtn.classList.remove('cards__like_active');
          this._counter.textContent = `${this._likes.length}`;
    }
  };*/

  lengthOfLikes(cardElement){
    this._counter.textContent = `${cardElement.likes.length}`
  }

/*_handleLikeClick(){
  this._likeBtn.classList.toggle('cards__like_active')
}*/

  /**_likeCard() {
    this._likeBtn.classList.toggle("cards__like_active");
  }*/

  /*_deleteCard() {
    this._element.remove();
    this._element = null;
  }*/

  async _deleteCard(evt){
    try{
        evt.preventDefault();
        await this._handleFormResetCard(this._cardId);
        this._element.remove();
    }
    catch(error){
        console.log(error);
    }
}
}
