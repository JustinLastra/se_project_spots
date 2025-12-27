const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = document.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  // {name: "Grand Canyon", link: http://slkdjfsl}
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
  cardLikeBtnEl.addEventListener("click", function () {
    cardLikeBtnEl.classList.toggle("card__like-button_active");
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", function () {
    cardElement.remove();
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
  editProfileModal.classList.add("modal_is-open");
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-open");
  editProfileForm.reset();
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-open");
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-open");
  newPostForm.reset(); // <-- Add this line
  closeModal(newPostModal);
});

function handleEditProfileSubmit(event) {
  event.preventDefault();
  profileNameElement.textContent = editProfileNameInput.value;
  console.log(editProfileNameInput.value);

  profileDescriptionElement.textContent = editProfileDescriptionInput.value;
  console.log(editProfileDescriptionInput.value);

  editProfileModal.classList.remove("modal_is-open");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

const imageDescriptionInput = document.querySelector("#card-description-input");
const imageLinkInput = document.querySelector("#card-image-input");

newPostForm.addEventListener("submit", function (event) {
  event.preventDefault();

  console.log(imageLinkInput.value);
  console.log(imageDescriptionInput.value);

  newPostModal.classList.remove("modal_is-open");

  const cardElement = getCardElement({
    name: imageDescriptionInput.value,
    link: imageLinkInput.value,
  });
  cardsList.prepend(cardElement);
  newPostForm.reset();
});

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", handleOverlayClick);
});
