import "./index.css";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation";
import UserInfo from "../scripts/components/UserInfo.js";

import {
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
  popupImage,
  settings,
} from "../scripts/utils/constants.js";

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
    handleBinClick,
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
  cardsSection.addItem(createCard(data));
});

const popupEditInfo = new PopupWithForm(popupEdit, (data) => {
  profileInfo.setUserInfo(data);
});
const popupOpenedImage = new PopupWithImage(popupImage);

const popupDeleteCard = new PopupWithConfirmation(popupRemoveCard);

const popupChangeAvatar = new PopupWithForm(popupAvatar,  (data) => {
  profileInfo.setUserInfo(data);
});

/**open big picture */
function handleCardClick(evt) {
  popupOpenedImage.open(evt.target);
}

function handleBinClick(evt) {
  popupDeleteCard.open(evt.target);
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
  const { userName, infoStatus } = profileInfo.getUserInfo();
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
  validatorAvatarForm.enableValidation();
}
)
