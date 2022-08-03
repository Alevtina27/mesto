import "./index.css";
import Api from '../scripts/components/Api.js';
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";

import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation";

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
  settings,
} from "../scripts/utils/constants.js";

const api = new Api({
host: 'https://mesto.nomoreparties.co/v1/cohort-47/cards',
headers: {
  authorization: 'f33435a7-771f-4f87-9cc8-2dc2b5e06d11',
'Content-Type': 'application/json'
},
});

Promise.all([
	api.getInitialCards(),
	api.getUserInfo(),
])
	.then(([unitialCards, newData])=>{
    profileInfo.setUserInfo(newData);
		cardsSection.render(unitialCards);
	})
	.catch((err)=>{
		console.log(err);
	})


/**Validation*/
const validatorEditForm = new FormValidator(formElementEdit, settings);

const validatorAddForm = new FormValidator(formElementAdd, settings);

const validatorAvatarForm = new FormValidator(formElementAvatar, settings)

/**create cards */
const createCard = (card) => {
  const newCard = new Card(
    card,
    "#element-template",
    handleCardClick,
    //handleBinClick,
    handleFormReset,
    handleAddLike,
  ).generateCard();
  return newCard;
};

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardItem = createCard(item);
      cardsSection.addItem(cardItem);
    },
  },
  elementContainer
);

/**forms */
const profileInfo = new UserInfo({
  userName: nameElement,
  infoStatus: infoElement,
  profileAvatar: profileImage,
});

const popupAddPlace = new PopupWithForm(popupAddCard, (data) => {
  popupAddPlace.loading(true)
  cardsSection.addItem(createCard(data));
  api.addCard(data)
  .then(() => {
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
  popupEditInfo.loading(true)
  profileInfo.setUserInfo(data);
  api.editUserInfo(data)
      .then((data) => {
        profileInfo.setUserInfo(data);
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

const popupDeleteCard = new PopupWithConfirmation(popupRemoveCard);

const popupChangeAvatar = new PopupWithForm(popupAvatar,  (data) => {
  popupChangeAvatar.loading(true)
  profileInfo.setUserInfo(data);
  api.changeAvatar(data)
      .then((data) => {
        avatar.src = data.profileAvatar;
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupChangeAvatar.loading(false);
      });
});

/**open big picture */
function handleCardClick(evt) {
  popupOpenedImage.open(evt.target);
}

/**function handleBinClick(evt) {
  popupDeleteCard.open(evt.target);
}*/


function handleFormReset(){
  popupDeleteCard.open();
  popupDeleteCard.submitCallback((card) => {
    api.deleteCard(card)
    .then(() => {
      popupDeleteCard.close();
      newCard.deleteCard();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
  })
});
}

function handleAddLike(card){
  api.addLikes(card)
  .then((data) => {
    newCard.handleLikesOfCard(data)
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
})
}


/**listeners */
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();
validatorAvatarForm.enableValidation();
cardsSection.renderItems();
popupEditInfo.setEventListeners();
popupAddPlace.setEventListeners();
popupOpenedImage.setEventListeners();
popupDeleteCard.setEventListeners();
popupChangeAvatar.setEventListeners();

buttonEdit.addEventListener("click", () => {
  popupEditInfo.open();
  const { userName, infoStatus} = profileInfo.getUserInfo();
  inputName.value = userName;
  inputAbout.value = infoStatus;
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
