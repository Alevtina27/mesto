export const initialCards = [
  {
    name: "Рио-де-Жанейро, Бразилия",
    link: "https://goo.su/NL9JVy5",
  },

  {
    name: "Шри-Ланка",
    link: "https://goo.su/EUpPS6",
  },

  {
    name: "Нью-Йорк, США",
    link: "https://goo.su/fUY1",
  },

  {
    name: "Таормина, Италия",
    link: "https://goo.su/PhkVB",
  },

  {
    name: "Дуньхуан, Китай",
    link: "https://goo.su/CwP74u",
  },

  {
    name: "Каппадокия, Турция",
    link: "https://goo.su/rLvv",
  },
];

export const buttonEdit = document.querySelector(
  ".profile__button_action_edit"
);
export const popupEdit = document.querySelector(".popup_type_edit");

export const nameElement = document.querySelector(".section-title");
export const infoElement = document.querySelector(".section-subtitle");

export const elementContainer = document.querySelector(".cards");
export const elementTemplate =
  document.querySelector("#element-template").content;

export const placeElements = document.querySelector(".elements");

export const popupAddCard = document.querySelector(".popup_type_add");
export const buttonAdd = document.querySelector(".profile__button_action_add");

export const formElementEdit = popupEdit.querySelector(
  ".popup__input-container_edit"
);
export const formElementAdd = popupAddCard.querySelector(
  ".popup__input-container_add"
);

export const popupAvatar = document.querySelector('.popup_type_avatar')
export const formElementAvatar = popupAvatar.querySelector('.popup__input-container_avatar')

export const inputName = document.querySelector(".popup__input_field_name");
export const inputAbout = document.querySelector(".popup__input_field_about");

export const popupImage = document.querySelector(".popup_type_image");
export const popupName = document.querySelector(".popup__caption");
export const popupBigImage = document.querySelector(".popup__image");

export const popupRemoveCard = document.querySelector('.popup_type_delete');
export const buttonDelete = document.querySelector('.cards__delete');
export const resetDelete = document.querySelector('#resetDelete')

export const profileImage = document.querySelector('.profile__image')


export const settings = {
  formSelector: ".popup__input-container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_type_visible",
};
