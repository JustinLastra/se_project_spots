const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_active",
};

const showInputError = (formEl, inputEl, errorMessage) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(settings.inputErrorClass);
  errorMessageEl.textContent = errorMessage;
  errorMessageEl.classList.add(settings.errorClass);
};

const hideInputError = (formEl, inputEl) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(settings.inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(settings.errorClass);
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true;
    buttonEl.classList.add(settings.inactiveButtonClass);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formEl, config) => {
  const inputList = formEl.querySelectorAll(config.inputSelector);
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonEl);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl);
      toggleButtonState(inputList, buttonEl);
    });
  });
};

const resetValidation = (formEl) => {
  const inputList = formEl.querySelectorAll(settings.inputSelector);
  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl);
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);
