import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  toggleButtonState,
} from "../scripts/validation.js";

// Import images so webpack can process them
function disableSubmitAfterReset(formEl) {
  const inputList = formEl.querySelectorAll(settings.inputSelector);
  const buttonEl = formEl.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonEl);
}

import Logo from "../images/Logo.svg";
import avatar from "../images/avatar.jpg";
import Pencil from "../images/Pencil.svg";
import plusIcon from "../images/plus-icon.svg";
import closeIcon from "../images/Group-27.png";
import Api from "../scripts/utils/Api.js";

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

// index.js

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2e8dfa5d-4ad4-4fc4-9dd9-09b7c6846ee2",
    "Content-Type": "application/json",
  },
});

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = document.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileSubmitBtn =
  editProfileForm.querySelector(".modal__submit-btn");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);
const editAvatarBtn = document.querySelector(".profile__avatar-btn");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarCloseBtn = editAvatarModal.querySelector(".modal__close-btn");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const editAvatarSubmitBtn = editAvatarForm.querySelector(".modal__submit-btn");
const editAvatarInput = editAvatarModal.querySelector("#profile-avatar-input");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteSubmitBtn = deleteForm.querySelector(".modal__submit-btn");
const deleteCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteCancelBtn = deleteModal.querySelector(".modal__button");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostSubmitBtn = newPostForm.querySelector(".modal__submit-btn");
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description",
);
const profileAvatarElement = document.querySelector(".profile__avatar");
const defaultProfile = {
  name: profileNameElement.textContent,
  about: profileDescriptionElement.textContent,
};

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

api
  .getAppInfo()
  .then(([cards, user]) => {
    if (user) {
      const apiName =
        user.name && user.name !== "Placeholder name" ? user.name : "";
      const apiAbout =
        user.about && user.about !== "Placeholder description"
          ? user.about
          : "";

      profileNameElement.textContent = apiName || defaultProfile.name;
      profileDescriptionElement.textContent = apiAbout || defaultProfile.about;
      if (user.avatar) {
        profileAvatarElement.src = user.avatar;
        profileAvatarElement.alt = "avatar";
      }
    }

    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

function getCardElement(data) {
  // {name: "Grand Canyon", link: http://slkdjfsl}
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-button_active");
  }
  cardLikeBtnEl.addEventListener("click", function () {
    const isLiked = cardLikeBtnEl.classList.contains(
      "card__like-button_active",
    );

    const likeAction = isLiked
      ? api.unlikeCard(data._id)
      : api.likeCard(data._id);

    likeAction
      .then((updatedCard) => {
        if (updatedCard.isLiked) {
          cardLikeBtnEl.classList.add("card__like-button_active");
        } else {
          cardLikeBtnEl.classList.remove("card__like-button_active");
        }
      })
      .catch(console.error);
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", function () {
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  cardImageEl.addEventListener("click", function () {
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  const formEl = modal.querySelector(".modal__form");

  if (formEl) {
    resetValidation(formEl);
  }
  modal.classList.add("modal_is-open");
  document.addEventListener("keydown", handleEscClose);
}
function closeModal(modal) {
  modal.classList.remove("modal_is-open");
  document.removeEventListener("keydown", handleEscClose);
}

function setButtonText(button, text) {
  if (button) {
    button.textContent = text;
  }
}

let selectedCard;
let selectedCardId;

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-open");
    closeModal(openedModal);
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

editAvatarBtn.addEventListener("click", function () {
  openModal(editAvatarModal);
});

editAvatarCloseBtn.addEventListener("click", function () {
  closeModal(editAvatarModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

deleteCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

deleteCancelBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

function handleEditProfileSubmit(event) {
  event.preventDefault();
  const defaultText = editProfileSubmitBtn.textContent;
  setButtonText(editProfileSubmitBtn, "Saving...");
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileDescriptionElement.textContent = data.about;
      editProfileForm.reset();
      disableSubmitAfterReset(editProfileForm);
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => setButtonText(editProfileSubmitBtn, defaultText));
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleEditAvatarSubmit(event) {
  event.preventDefault();
  const defaultText = editAvatarSubmitBtn.textContent;
  setButtonText(editAvatarSubmitBtn, "Saving...");
  api
    .editUserAvatar({ avatar: editAvatarInput.value })
    .then((data) => {
      profileAvatarElement.src = data.avatar;
      profileAvatarElement.alt = "avatar";
      closeModal(editAvatarModal);
      editAvatarForm.reset();
      disableSubmitAfterReset(editAvatarForm);
    })
    .catch(console.error)
    .finally(() => setButtonText(editAvatarSubmitBtn, defaultText));
}

editAvatarForm.addEventListener("submit", handleEditAvatarSubmit);

const imageDescriptionInput = document.querySelector("#card-description-input");
const imageLinkInput = document.querySelector("#card-image-input");

newPostForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const defaultText = newPostSubmitBtn.textContent;
  setButtonText(newPostSubmitBtn, "Saving...");

  api
    .addCard({
      name: imageDescriptionInput.value,
      link: imageLinkInput.value,
    })
    .then((card) => {
      const cardElement = getCardElement(card);
      cardsList.prepend(cardElement);
      closeModal(newPostModal);
      newPostForm.reset();
      disableSubmitAfterReset(newPostForm);
    })
    .catch(console.error)
    .finally(() => setButtonText(newPostSubmitBtn, defaultText));
});

deleteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!selectedCardId) {
    return;
  }

  const defaultText = deleteSubmitBtn.textContent;
  setButtonText(deleteSubmitBtn, "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      if (selectedCard) {
        selectedCard.remove();
      }
      selectedCard = null;
      selectedCardId = null;
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => setButtonText(deleteSubmitBtn, defaultText));
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", handleOverlayClick);
});

enableValidation(settings);

// Set image sources from imported assets
document.querySelector(".header__logo").src = Logo;
document.querySelector(".profile__pencil-icon").src = Pencil;
document.querySelector(".profile__edit-btn img").src = Pencil;
document.querySelector(".profile__add-btn img").src = plusIcon;
document.querySelectorAll(".modal__close-btn img").forEach((img) => {
  img.src = closeIcon;
});
