import "./index.css";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation";
import Api from "../scripts/components/Api.js";

import {
  buttonEdit,
  popupEdit,
  popupAvatar,
  nameElement,
  infoElement,
  elementContainer,
  popupAddCard,
  buttonAdd,
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

let userId;

const api = new Api({
  host: "https://mesto.nomoreparties.co/v1/cohort-47/",
  headers: {
    authorization: "f33435a7-771f-4f87-9cc8-2dc2b5e06d11",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, unitialCards]) => {
    userId = data._id;
    userInfo.setUserInfo(data);
    cardsSection.renderItems(unitialCards.reverse());
    // console.log(unitialCards)
  })
  .catch((err) => {
    console.log(err);
  });

/**Validation*/
const validatorEditForm = new FormValidator(formElementEdit, settings);

const validatorAddForm = new FormValidator(formElementAdd, settings);

const validatorAvatarForm = new FormValidator(formElementAvatar, settings);

/**create cards, likes, deleting */

const createCard = (data) => {
  const newCard = new Card({
    data: data,
    cardSelector: "#element-template",
    handleCardClick: (name, link) => {
      popupOpenedImage.open(name, link);
    },
    handleFormDeleteCard: (id, deleteCard) => {
      popupDeleteCard.confirmationHandler(() => {
        api
          .deleteCard(id)
          .then(() => {
            deleteCard();
            popupDeleteCard.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleAddLike: (id, addLikes, handleLikeCard) => {
      api
        .addLikes(id)
        .then(() => {
          addLikes();
          handleLikeCard();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (id, removeLikes, handleLikeCard) => {
      api
        .removeLikes(id)
        .then(() => {
          removeLikes();
          handleLikeCard();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
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

/**info about user */
const userInfo = new UserInfo({
  name: nameElement,
  about: infoElement,
  avatar: profileImage,
});

/**popup with add new cards */
const popupAddPlace = new PopupWithForm(popupAddCard, (data) => {
  popupAddPlace.loading(true);
  api
    .addCard(data)
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

/**popup with change info in profile */
const popupEditInfo = new PopupWithForm(popupEdit, (data) => {
  popupEditInfo.loading(true);
  api
    .editUserInfo(data)
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

/**popup with open big card */
const popupOpenedImage = new PopupWithImage(popupImage);

/**popup with delete card */
const popupDeleteCard = new PopupWithConfirmation(popupRemoveCard);

/**popup with change avatar */
const popupChangeAvatar = new PopupWithForm(popupAvatar, (data) => {
  popupChangeAvatar.loading(true);
  //console.log(data)
  api
    .changeAvatar(data)
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
  const { name, about } = userInfo.getUserInfo();
  inputName.value = name;
  inputAbout.value = about;
  validatorEditForm.clearValidation();
});

buttonAdd.addEventListener("click", () => {
  popupAddPlace.open();
  validatorAddForm.clearValidation();
});

profileImage.addEventListener("click", () => {
  popupChangeAvatar.open();
  validatorAvatarForm.clearValidation();
});
