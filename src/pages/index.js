import "./index.css";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";

import {
  initialCards,
  buttonEdit,
  popupEdit,
  nameElement,
  infoElement,
  elementContainer,
  popupAddCard,
  buttonAdd,
  formElementEdit,
  formElementAdd,
  inputName,
  inputAbout,
  popupImage,
  settings,
} from "../scripts/utils/constants.js";


/**const handleCardClick = (name, link) => {
  popupOpenedImage.open(name, link);
};*/

/**Validation*/
const validatorEditForm = new FormValidator(formElementEdit, settings);

const validatorAddForm = new FormValidator(formElementAdd, settings);


/*const createCard = (data) => {
  const card = new Card(data, "#element-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};*/

/*const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    },
  },
  elementContainer,
);*/
const createCard = (card) => {
  const newCard = new Card(card, "#element-template", handleCardClick).generateCard();
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
  elementContainer,
);

const profileInfo = new UserInfo({
  userName: nameElement,
  infoStatus: infoElement,
});

/*const handleAddCardFormSubmit = (data) => {
  cardsSection.addItem(createCard(data));
  popupAddPlace.close();
};*/


/*const handleProfileEditFormSubmit = (data) => {
  profileInfo.setUserInfo(data);
  popupEditInfo.close();
};*/

const popupAddPlace = new PopupWithForm(popupAddCard,
  (data) => {
  cardsSection.addItem(createCard(data));
  }
);

const popupEditInfo = new PopupWithForm(popupEdit,
  (data) => {
  profileInfo.setUserInfo(data);
  }
);
const popupOpenedImage = new PopupWithImage(popupImage);


function handleCardClick(evt){
  popupOpenedImage.open(evt.target);
};


validatorEditForm.enableValidation();
validatorAddForm.enableValidation();
cardsSection.renderItems();
popupEditInfo.setEventListeners();
popupAddPlace.setEventListeners();
popupOpenedImage.setEventListeners();

/**event handlers */
buttonEdit.addEventListener("click", () => {
  popupEditInfo.open();
  const {userName, infoStatus} = profileInfo.getUserInfo();
  inputName.value = userName;
  inputAbout.value = infoStatus;
  validatorEditForm.clearValidation();
});

buttonAdd.addEventListener("click", () => {
  popupAddPlace.open();
  validatorAddForm.clearValidation();
});

