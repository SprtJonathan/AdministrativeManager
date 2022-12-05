function authModal(functionToExecute) {
  const authModalBlur = document.createElement("div");
  authModalBlur.setAttribute("class", "auth-modal-blur");

  const authModalContainer = document.createElement("div");
  authModalContainer.setAttribute("id", "auth-user");
  authModalContainer.setAttribute("class", "auth-modal");

  const authModalContent = document.createElement("div");
  authModalContent.setAttribute("class", "auth-modal-content");

  const authModalLogo = document.createElement("div");
  // authModalLogo.setAttribute(
  //   "src",
  //   "../public/assets/img/Unofficial_JavaScript_logo_2.svg"
  // );
  authModalLogo.setAttribute("class", "auth-modal-background");
  authModalLogo.setAttribute("width", "60%");
  authModalLogo.setAttribute("height", "60%");
  authModalLogo.innerHTML = `<i class="fa fa-lock"></i>`;

  const authMessageContainer = document.createElement("div");
  authMessageContainer.setAttribute("class", "auth-message-container");

  const authTitle = document.createElement("h3");
  authTitle.setAttribute("class", "auth-content");
  authTitle.textContent =
    "Veuillez vous authentifier pour accéder à cet espace.";

  const authUserForm = document.createElement("form");
  authUserForm.setAttribute("id", "auth-user-form");
  authUserForm.setAttribute("class", "auth-user-form-group");

  const authUserIdLabel = document.createElement("label");
  authUserIdLabel.setAttribute("class", "auth-user-label");
  authUserIdLabel.setAttribute("for", "auth-user-uid");
  authUserIdLabel.textContent = "ID d'utilisateur";

  const authUserIdInput = document.createElement("input");
  authUserIdInput.setAttribute("class", "auth-user-input");
  authUserIdInput.setAttribute("type", "text");
  authUserIdInput.setAttribute("name", "auth-user-uid");
  authUserIdInput.setAttribute("required", "true");

  const authUserPassLabel = document.createElement("label");
  authUserPassLabel.setAttribute("class", "auth-user-label");
  authUserPassLabel.setAttribute("for", "auth-user-uid");
  authUserPassLabel.textContent = "Passe secret";

  const authUserPassInput = document.createElement("input");
  authUserPassInput.setAttribute("class", "auth-user-input");
  authUserPassInput.setAttribute("type", "text");
  authUserPassInput.setAttribute("name", "auth-user-uid");
  authUserPassInput.setAttribute("required", "true");

  authUserForm.appendChild(authUserIdLabel);
  authUserForm.appendChild(authUserIdInput);
  authUserForm.appendChild(authUserPassLabel);
  authUserForm.appendChild(authUserPassInput);

  authMessageContainer.appendChild(authTitle);
  authMessageContainer.appendChild(authUserForm);

  authModalContent.appendChild(authMessageContainer);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "auth-button-container");

  const proceedButton = document.createElement("button");
  proceedButton.setAttribute("class", "auth-button-success");
  proceedButton.innerHTML = "Connexion";
  proceedButton.addEventListener("click", (e) => {
    functionToExecute;
    authModalContainer.remove();
    authModalBlur.remove();
  });

  buttonsContainer.appendChild(proceedButton);

  authModalContent.appendChild(buttonsContainer);
  authModalContent.appendChild(authModalLogo);

  authModalContainer.appendChild(authModalContent);

  document.body.appendChild(authModalContainer);
  document.body.appendChild(authModalBlur);

  return authModalContainer;
}
