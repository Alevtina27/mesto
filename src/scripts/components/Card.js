export default class Card {
  constructor({data, cardSelector, userId, handleCardClick, handleFormDeleteCard, handleAddLike, handleRemoveLike}) {
    this._link = data.link;
    this._name = data.name;
   this._likes = data.likes;
  this._cardId = data._id;
 // this._id = data._id;
    this._userId = userId;
    //this._userId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleFormDeleteCard = handleFormDeleteCard;
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
    //this._handleLikeCard();
    return this._element;
  }



  _setEventListeners() {

    this._deleteBtn.addEventListener("click", () => {
      this._handleFormDeleteCard(this._cardId, this._element);
    });
    //this._deleteBtn.addEventListener("click", this._handleBinClick);

    this._photoElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

   this._likeBtn.addEventListener('click', () => {
    //this._likeBtn.classList.contains('cards__like_active')
    //this._likeBtn.classList.toggle('cards__like_active')
      if (this._likeBtn.classList.contains('cards__like_active')) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleAddLike(this._cardId);
      }
    })

   /* this._likeBtn.addEventListener('click', () => {
     if(this._likeBtn.classList.toggle('cards__like_active')){
      this.handleLikeCard();
     }

    })*/


    //this._deleteBtn.addEventListener("click", this._deleteCard);
  }

  _holderOfCards(){
    if(this._userId !== this._ownerId){
      this._deleteBtn.remove();
    }
}

_cardLiked(){
  if (this._likes.some((user) => {
    return this._userId === user._id;
  })) {
    this._likeBtn.classList.add('cards__like_active');
  }
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

 /* handleLikeCard(card) {
    //this._likes = data.likes;
    this._likeBtn.classList.toggle('cards__like_active');
  //  this._counter.value = parseInt(this._counter.value) + 1;
    this._counter.textContent = `${card.likes.length}`;
  }*/

  /*_handleLikeCard(likes) {
  this._counter = this._element.querySelector(".cards__counter");
  this._likeBtn.classList.toggle('cards__like_active');
  if (likes.length === 0) {
    this._counter.textContent = '';
  } else {
    this._counter.textContent = likes.length;
  }
  }*/
   addLikes(){
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

  };

  /*lengthOfLikes(data){
    this._likeBtn.classList.toggle('cards__like_active');
    this._counter.textContent = `${data.likes.length}`
  } `${this._likes.length}`*/


/*_handleLikeClick(){
  this._likeBtn.classList.toggle('cards__like_active')
}*/

  /**_likeCard() {
    this._likeBtn.classList.toggle("cards__like_active");
  }*/

 _deleteCard() {
    this._element.remove();
    this._element = null;
  }
  /*async _deleteCard(evt){
    try{
        evt.preventDefault();
        await this._handleFormResetCard(this._id);
        this._element.remove();
    }
    catch(error){
        console.log(error);
    }
}*/
}
