function confirmationModal(
  modalId,
  messageContent,
  proceedButtonText,
  valueToChange
) {
  const confirmationModalContainer = document.createElement("div");
  confirmationModalContainer.setAttribute("id", modalId);
  confirmationModalContainer.setAttribute("class", "confirmation-modal");

  const confirmationModalContent = document.createElement("div");
  confirmationModalContent.setAttribute("class", "confirmation-modal-content");

  const confirmationMessageContainer = document.createElement("div");
  confirmationMessageContainer.setAttribute(
    "class",
    "confirmation-message-container"
  );
  const confirmationMessage = document.createElement("p");
  confirmationMessage.setAttribute("class", "confirmation-message");
  confirmationMessage.innerHTML = messageContent;

  confirmationMessageContainer.appendChild(confirmationMessage);
  confirmationModalContent.appendChild(confirmationMessageContainer);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "confirmation-button-container");

  const proceedButton = document.createElement("button");
  proceedButton.setAttribute("class", "confirmation-button-success");
  proceedButton.innerHTML = proceedButtonText;
  proceedButton.addEventListener("click", (e) => {
    valueToChange = true;
    confirmationModalContainer.remove();
  });

  const abortButton = document.createElement("button");
  abortButton.setAttribute("id", modalId + "-abort-button");
  abortButton.setAttribute("class", "confirmation-button-abort");
  abortButton.textContent = "Annuler";
  abortButton.addEventListener("click", (e) => {
    valueToChange = false
    confirmationModalContainer.remove();
  });

  buttonsContainer.appendChild(proceedButton);
  buttonsContainer.appendChild(abortButton);
  confirmationModalContent.appendChild(buttonsContainer);

  confirmationModalContainer.appendChild(confirmationModalContent);

  document.body.appendChild(confirmationModalContainer);

  return confirmationModalContainer;
}
