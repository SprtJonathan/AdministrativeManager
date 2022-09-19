const localStorageContent = JSON.parse(localStorage.getItem("formInputs"));
const newObjectForm = document.getElementById("newObjectForm");

let tables;

if (
  localStorage.getItem("tables") == null ||
  localStorage.getItem("tables") == undefined
) {
  tables = localStorage.setItem("tables", tables);
} else {
  tables = JSON.parse(localStorage.getItem("tables"));
}

function initPage() {
  const selectSection = document.getElementById("selector-select-new");
  console.log(tables);

  if (Array.isArray(tables)) {
    const selectContainer = document.createElement("div");
    selectContainer.setAttribute("id", "select-container");
    selectContainer.setAttribute("class", "intro-select");

    const selectLabel = document.createElement("label");
    selectLabel.setAttribute("for", "table-selector");
    selectLabel.textContent = "Sélectionnez le tableau à modifier";

    const selectElement = document.createElement("select");
    selectElement.setAttribute("name", "table-selector");
    selectElement.setAttribute("id", "table-selector");

    selectContainer.appendChild(selectLabel);
    selectLabel.appendChild(selectElement);
    selectSection.appendChild(selectContainer);

    tables.forEach((table) => {
      // Create options for the select element
      const selectOption = document.createElement("option");
      selectOption.setAttribute("id", table.tableId);
      selectOption.textContent = table.tableName;

      selectElement.appendChild(selectOption);

      // Create menu buttons for each table
      const tableButtonContainer = document.createElement("div");
      tableButtonContainer.setAttribute("class", "navbar-table-link-block");

      const tableButtonLink = document.createElement("a");
      tableButtonLink.setAttribute("class", "navbar-table-link");
      tableButtonLink.setAttribute("href", "./table.html?id=" + table.tableId);
      tableButtonLink.setAttribute("title", table.tableName);
      tableButtonContainer.appendChild(tableButtonLink);

      const tableLogo = document.createElement("i");
      tableLogo.setAttribute("class", "fa fa-table");
      tableButtonLink.appendChild(tableLogo);

      const tableTitle = document.createElement("h5");
      tableTitle.setAttribute("class", "navbar-table-title");
      tableTitle.textContent = table.tableName;
      tableButtonLink.appendChild(tableTitle);

      const closeButtonSpan = document.createElement("span");
      closeButtonSpan.setAttribute("id", "delete-table-" + table.tableId);
      closeButtonSpan.setAttribute("class", "navbar-table-link-delete");
      closeButtonSpan.setAttribute("title", "Supprimer le tableau");
      tableButtonContainer.appendChild(closeButtonSpan);

      const closeButtonIcon = document.createElement("i");
      closeButtonIcon.setAttribute(
        "class",
        "navbar-table-link-delete-icon fa fa-xmark"
      );
      closeButtonSpan.appendChild(closeButtonIcon);

      document.getElementById("table-list").appendChild(tableButtonContainer);
    });
    return selectElement;
  }
}

let selectedTable;
function setSelectedTable() {
  const selectedTableOption = selectTable.value;

  selectedTable = selectTable.options[selectTable.selectedIndex];
}

const selectTable = initPage();

setSelectedTable();

selectTable.addEventListener("change", () => {
  setSelectedTable();
  console.log(selectedTable);
});

// Function used to create a new form to the tool
function createNewTable() {
  const tableName = document.getElementById("newTableName").value;

  console.log(tableName);

  const tableId = tableName.split(" ").join("_") + "-" + Date.now();

  const newTable = {
    tableName: tableName,
    tableId: tableId,
    tableInputs: "",
    tableData: "",
  };

  if (Array.isArray(tables)) {
    tables.push(newTable);
  } else {
    tables = [];
    tables.push(newTable);
  }

  localStorage.setItem("tables", JSON.stringify(tables));
}

function addInputToForm(event) {
  event.preventDefault();

  const selectedTableContent = tables.find((table) => {
    return table.tableId === selectedTable.id;
  });

  console.log(selectedTableContent);

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
