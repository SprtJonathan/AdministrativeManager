const localStorageContent = JSON.parse(localStorage.getItem("formInputs"));
console.log(localStorageContent);

const newObjectForm = document.getElementById("newObjectForm");

function addInputToForm(event) {
  event.preventDefault();

  const newInputName = document.getElementById("newInput");
  const newInputType = document.getElementById("newInputType");
  const newInputRequired = document.getElementById("isRequired");

  if (newInputName.value == "") {
    return (document.getElementById("errorNewInput").innerHTML =
      "DONNEZ UN NOM AU CHAMP");
  }

  const newInputObject = {
    name: newInputName.value,
    type: newInputType.value,
    required: newInputRequired.checked,
  };

  // Now we send the new input data to the JSON file
  if (localStorage.getItem("formInputs") === null) {
    let newArray = [];
    newArray.push(newInputObject);
    localStorage.setItem("formInputs", JSON.stringify(newArray));
  } else {
    let newArray = localStorageContent.concat([newInputObject]);
    console.log(newArray);
    if (
      !localStorageContent.some(
        (e) =>
          e.name === newInputObject.name &&
          e.type === newInputObject.type &&
          e.required === newInputObject.required
      )
    ) {
      localStorage.setItem("formInputs", JSON.stringify(newArray));
    }
  }
  location.reload();
}

function getFormInputs() {
  if (localStorageContent != null) {
    for (i = 0; i < localStorageContent.length; i++) {
      const label = document.createElement("label");
      label.setAttribute("for", localStorageContent[i].name);
      label.innerText = localStorageContent[i].name;

      const input = document.createElement("input");
      input.setAttribute("name", localStorageContent[i].name);
      input.setAttribute("type", localStorageContent[i].type);
      input.setAttribute("id", localStorageContent[i].name);
      input.setAttribute("placeholder", localStorageContent[i].name);
      if (localStorageContent[i].required === true) {
        input.setAttribute("required", true);
      }

      const deleteInput = document.createElement("button");
      deleteInput.setAttribute("id", input.name + "Delete");
      deleteInput.setAttribute("class", "button-remove");
      deleteInput.setAttribute("type", "button");
      deleteInput.setAttribute("onclick", "deleteInput(" + i + ")");
      deleteInput.innerText = "X";

      const inputDeleteDiv = document.createElement("div");
      inputDeleteDiv.appendChild(input);
      inputDeleteDiv.appendChild(deleteInput);

      const newInputDiv = document.createElement("div");
      newInputDiv.setAttribute("class", "form-group");
      newInputDiv.setAttribute("id", input.name + "Group" + i);
      newInputDiv.appendChild(label);
      newInputDiv.appendChild(inputDeleteDiv);

      newObjectForm.appendChild(newInputDiv);
    }
  }
}

function deleteInput(index) {
  let array = localStorageContent;
  array.splice(index, 1);
  console.log(array);
  localStorage.setItem("formInputs", JSON.stringify(array));
  location.reload();
}

function displayMainForm() {
  if (localStorageContent != null && localStorageContent.length > 0) {
    console.log("OUIOUI");
    document.getElementById("mainFormBlock").style.display = "flex";
  }
}

function submitMainForm() {
  let everyKeys = [];
  let everyValues = [];
  for (i = 0; i < localStorageContent.length; i++) {
    everyKeys.push(localStorageContent[i].name);
    everyValues.push(
      document.getElementById(localStorageContent[i].name).value
    );
  }
  let newObject = {};
  everyKeys.forEach((key, i) => (newObject[key] = everyValues[i]));
  console.log(newObject);

  if (JSON.parse(localStorage.getItem("data")) === null) {
    let newArray = [];
    newArray.push(newObject);
    localStorage.setItem("data", JSON.stringify(newArray));
  } else {
    let newArray = JSON.parse(localStorage.getItem("data")).concat([newObject]);
    console.log(newArray);

    localStorage.setItem("data", JSON.stringify(newArray));
  }
}

getFormInputs();
displayMainForm();
