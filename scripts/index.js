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

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  editProfileModal.classList.add("modal_is-open");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-open");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-open");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-open");
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
});
