import "./index.css";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation";
import Api from '../scripts/components/Api.js';

import {
  cardsElements,
  initialCards,
  buttonEdit,
  popupEdit,
  popupAvatar,
  nameElement,
  infoElement,
  elementContainer,
  popupAddCard,
  buttonAdd,
  buttonDelete,
  resetDelete,
  popupRemoveCard,
  formElementEdit,
  formElementAdd,
  formElementAvatar,
  profileImage,
  inputName,
  inputAbout,
  inputAvatar,
  popupImage,
  cardsLikeButton,
  settings,
} from "../scripts/utils/constants.js";

let userId;


const api = new Api({
host: 'https://mesto.nomoreparties.co/v1/cohort-47/',
headers: {
  authorization: 'f33435a7-771f-4f87-9cc8-2dc2b5e06d11',
'Content-Type': 'application/json'
}
});

Promise.all([
	api.getUserInfo(),
  api.getInitialCards(),
])
	.then(([data, unitialCards])=>{
    userId = data._id;
    userInfo.setUserInfo(data);
		cardsSection.renderItems(unitialCards);
    console.log(unitialCards)
	})
	.catch((err)=>{
		console.log(err);
	})

/**Validation*/
const validatorEditForm = new FormValidator(formElementEdit, settings);

const validatorAddForm = new FormValidator(formElementAdd, settings);

const validatorAvatarForm = new FormValidator(formElementAvatar, settings)

/**create cards */
function createCard (data) {
  const newCard = new Card({
    data: data,
   cardSelector: "#element-template",
   handleCardClick: (name, link) => {
    popupOpenedImage.open(name, link);
  },
  /* handleFormDeleteCard: (card, cardId) => {
    popupDeleteCard.open(card, cardId);
  },*/
  handleFormDeleteCard: (id) => {
    popupDeleteCard.open();
   // popupDeleteCard.confirmationHandler(() => {
    api.deleteCard(id)
    .then((newCard) => {
      newCard.deleteCard();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
  })
   // })
  },
    handleAddLike: (id) => {
      api.addLikes(id)
        .then(()=>{
          newCard.addLikes();
         // newCard.handleLikeCard(card);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
      })
    },
   handleRemoveLike: (id) =>{
    api.removeLikes(id)
   .then(()=>{
    newCard.removeLikes();
    // newCard.handleLikeCard(card)
   })
   .catch((err) => {
     console.log(`Ошибка: ${err}`);
 })
},
   userId: userId,
  }).generateCard();
  return newCard;
};

const cardsSection = new Section(
  {
    renderer: (item) => {
      const cardItem = createCard(item);
      cardsSection.addItem(cardItem);
    },
  },
  elementContainer
);

/**forms */
const userInfo = new UserInfo({
  name: nameElement,
  about: infoElement,
  avatar: profileImage,
});

const popupAddPlace = new PopupWithForm(popupAddCard, (data) => {
  popupAddPlace.loading(true)
  //cardsSection.addItem(createCard(data));
  api.addCard(data)
  .then((data) => {
    cardsSection.addItem(createCard(data));
    popupAddPlace.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    popupAddPlace.loading(false);
  });
});

const popupEditInfo = new PopupWithForm(popupEdit, (data) => {
  popupEditInfo.loading(true);
  //console.log(newData)
  //profileInfo.setUserInfo(newData);
  api.editUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditInfo.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEditInfo.loading(false);
      });
  });



const popupOpenedImage = new PopupWithImage(popupImage);

const popupDeleteCard = new PopupWithConfirmation(popupRemoveCard)
  /* {
    handleRemoveCard: (id) => {
  api.deleteCard(id)
    .then(() => {
      newCard.deleteCard();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
  })}
});*/

const popupChangeAvatar = new PopupWithForm(popupAvatar,  (data) => {
  popupChangeAvatar.loading(true);
  //console.log(data)
  api.changeAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupChangeAvatar.loading(false);
      });
});

/*function handleRemoveCard (newCard){
  api.deleteCard(newCard._id)
    .then(() => {
      newCard.deleteCard();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
  })
    }*/



/*open big picture */

/*const handleCardClick = (name, link) => {
  popupOpenedImage.open(name, link);
}*/

/*const handleFormDeleteCard = (newCard) => {
  popupDeleteCard.open();
  popupDeleteCard.handleRemoveCard(() => {
  api.deleteCard(newCard._id)
  .then(() => {
   element.remove();
    element = null;
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
})
  })
}*/

/*function handleDeleteCard(id){
  popupDeleteCard.open();
    api.removeCard(id)
    .then(() => {
      newCard.deleteCard();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
  })
}*/


/*function handleAddLike(id){
  api.addLikes(id)
  .then((data)=>{
   // newCard.addMoreLikes();
   // newCard.handleLikeCard(data);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
})
}

function handleRemoveLike(id){
  api.removeLikes(id)
  .then((data)=>{
   // newCard.deleteLikes();
   //  newCard.handleLikeCard(data)
  }).catch((err) => {
    console.log(`Ошибка: ${err}`);
})
}*/

/*function handleLikesOfCard(id){
  api.addLikes(id)
  .then((data) => {
    newCard.handleLikeCard(data)
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
})
}*/



/**listeners */
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();
validatorAvatarForm.enableValidation();
popupEditInfo.setEventListeners();
popupAddPlace.setEventListeners();
popupOpenedImage.setEventListeners();
popupDeleteCard.setEventListeners();
popupChangeAvatar.setEventListeners();

buttonEdit.addEventListener("click", () => {
  popupEditInfo.open();
  const { name, about} = userInfo.getUserInfo();
  inputName.value = name;
  inputAbout.value = about;
  validatorEditForm.clearValidation();
});

buttonAdd.addEventListener("click", () => {
  popupAddPlace.open();
  validatorAddForm.clearValidation();

});

profileImage.addEventListener('click', () =>{
  popupChangeAvatar.open();
  validatorAvatarForm.clearValidation();
}
)




//по продленке
/**
function createCard (data){
  const newCard = new Card(data, userId);
}

function handleSubmitCard(data){
  api.createCard(data)
  .then(res => {
    section.createCard(card)
  })
  .catch(err => console.log(err));
  .finally(() => popup.loading(false);)
}


*/
