const newObjectForm = document.getElementById("newObjectForm");

let tables = [];

if (localStorage.getItem("tables")) {
  tables = JSON.parse(localStorage.getItem("tables"));
} else {
  tables = localStorage.setItem("tables", tables);
}

function initPage() {
  const selectSection = document.getElementById("selector-select-new");
  console.log(tables);

  if (Array.isArray(tables)) {
    if (tables.length > 0) {
      const selectContainer = document.createElement("div");
      selectContainer.setAttribute("id", "select-container");
      selectContainer.setAttribute("class", "intro-select");

      const selectLabel = document.createElement("label");
      selectLabel.setAttribute("for", "table-selector");
      selectLabel.textContent = "Sélection du tableau";

      const selectElement = document.createElement("select");
      selectElement.setAttribute("name", "table-selector");
      selectElement.setAttribute("id", "tableSelector");
      selectElement.setAttribute("class", "table-select");

      selectContainer.appendChild(selectLabel);
      selectContainer.appendChild(selectElement);
      selectSection.appendChild(selectContainer);

      tables.forEach((table) => {
        // Create options for the select element
        const selectOption = document.createElement("option");
        selectOption.setAttribute("id", table.tableId);
        selectOption.setAttribute("class", "select-options");
        selectOption.textContent = table.tableName;

        selectElement.appendChild(selectOption);

        // Create menu buttons for each table
        const tableButtonContainer = document.createElement("div");
        tableButtonContainer.setAttribute("class", "navbar-table-link-block");

        const tableButtonLink = document.createElement("a");
        tableButtonLink.setAttribute("class", "navbar-table-link");
        tableButtonLink.setAttribute(
          "href",
          "./table.html?id=" + table.tableId
        );
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
        closeButtonSpan.setAttribute("id", "deleteTable-" + table.tableId);
        closeButtonSpan.setAttribute("class", "navbar-table-link-delete");
        closeButtonSpan.setAttribute("title", "Supprimer le tableau");
        tableButtonContainer.appendChild(closeButtonSpan);

        const closeButtonIcon = document.createElement("i");
        closeButtonIcon.setAttribute(
          "id",
          "deleteTable-" + table.tableId + "-icon"
        );
        closeButtonIcon.setAttribute(
          "class",
          "navbar-table-link-delete-icon fa fa-xmark"
        );
        closeButtonSpan.appendChild(closeButtonIcon);

        closeButtonSpan.addEventListener("click", (e) => {
          const tableToDelete = e.target.id.split("-")[1];
          deleteTable(tableToDelete);
          console.log(tableToDelete);
        });

        document.getElementById("table-list").appendChild(tableButtonContainer);
      });
      return selectElement;
    }
  }
}

// Asign the localstorage variable to the select value if none is set
function setSelectedTable() {
  selectedTableOption = selectTable.options[selectTable.selectedIndex];
  console.log(selectedTableOption.value);
  localStorage.setItem("selected-table", selectedTableOption.id);

  if (localStorage.getItem("selected-table")) {
    selectTable.options[localStorage.getItem("selected-table")].selected = true;
  }

  selectedTable = tables.find((table) => {
    return table.tableId === selectedTableOption.id;
  });
  selectedTableIndex = tables.indexOf(selectedTable);
  location.reload();
}

// Function used to create a new form to the tool
function createNewTable() {
  const tableName = document.getElementById("newTableName").value;

  console.log(tableName);

  // We create a unique ID for each table to allow for an easier identification by the code
  const tableId = tableName.split(" ").join("_") + "_" + Date.now();

  const newTable = {
    tableName: tableName,
    tableId: tableId,
    tableInputs: [],
    tableData: [],
  };

  if (Array.isArray(tables)) {
    tables.push(newTable);
  } else {
    tables = [];
    tables.push(newTable);
  }

  localStorage.setItem("tables", JSON.stringify(tables));
}

// Function that handles the deletion of a table
function deleteTable(idOfTable) {
  // We look for the table we want to delete in the global tables array
  const tableToDelete = tables.find((table) => table.tableId === idOfTable);
  // console.log(tableToDelete);
  console.log(tables.indexOf(tableToDelete));
  // Now we register the table's index
  const tableIndex = tables.indexOf(tableToDelete);
  tables.splice(tableIndex, 1);
  localStorage.setItem("tables", JSON.stringify(tables));
  location.reload();
}

// Function that allows to create a new input in the main form
function addInputToForm(event) {
  event.preventDefault();

  const tableInputs = selectedTable.tableInputs;

  // console.log(selectedTable);

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

  // If the table does not have any inputs yet then we create an array in which all of the inputs will be contained
  if (tableInputs === []) {
    let newArray = [];
    newArray.push(newInputObject);
    tableInputs = newArray;
    // Now we register the table's index
    tables.splice(selectedTableIndex, 1, selectedTable);
    localStorage.setItem("tables", JSON.stringify(tables));
  } else if (
    // Else, we check if the exact same input exists in the table. If it's the case we don't add the new one, if it's not we can add it
    !selectedTable.tableInputs.some(
      (e) =>
        e.name === newInputObject.name &&
        e.type === newInputObject.type &&
        e.required === newInputObject.required
    )
  ) {
    let newArray = tableInputs.concat([newInputObject]);
    selectedTable.tableInputs = newArray;
    tables.splice(selectedTableIndex, 1, selectedTable);
    console.log(tables);
    localStorage.setItem("tables", JSON.stringify(tables));
  } else {
    alert("Ce champ est déjà présent à l'identique dans ce tableau");
  }

  location.reload();
}

function getFormInputs() {
  if (selectedTable.tableInputs != null) {
    for (i = 0; i < selectedTable.tableInputs.length; i++) {
      const label = document.createElement("label");
      label.setAttribute("for", selectedTable.tableInputs[i].name);
      label.innerText = selectedTable.tableInputs[i].name;

      const input = document.createElement("input");
      input.setAttribute("name", selectedTable.tableInputs[i].name);
      input.setAttribute("type", selectedTable.tableInputs[i].type);
      input.setAttribute("id", selectedTable.tableInputs[i].name);
      input.setAttribute("class", "new-input");
      input.setAttribute("placeholder", selectedTable.tableInputs[i].name);
      if (selectedTable.tableInputs[i].required === true) {
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
  let array = selectedTable.tableInputs;
  array.splice(index, 1);
  console.log(array);
  selectedTable.tableInputs = array;
  tables.splice(selectedTableIndex, 1, selectedTable);
  localStorage.setItem("tables", JSON.stringify(tables));
  location.reload();
}

function displayMainForm() {
  if (selectedTable) {
    document.getElementById("newInputFormBlock").style.display = "flex";
  } else {
    document.getElementById("newInputFormBlock").style.display = "none";
  }
  if (
    selectedTable.tableInputs != null &&
    selectedTable.tableInputs.length > 0
  ) {
    console.log("OUIOUI");
    document.getElementById("mainFormBlock").style.display = "flex";
  } else {
    document.getElementById("mainFormBlock").style.display = "none";
  }
}

function submitMainForm() {
  let everyKeys = [];
  let everyValues = [];
  for (i = 0; i < selectedTable.tableInputs.length; i++) {
    everyKeys.push(selectedTable.tableInputs[i].name);
    everyValues.push(
      document.getElementById(selectedTable.tableInputs[i].name).value
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

const selectTable = initPage();

// Initialization of the variables of the selected table
let selectedTableOption, selectedTable, selectedTableIndex;
if (tables.length > 0) {
  if (localStorage.getItem("selected-table")) {
    selectTable.options[localStorage.getItem("selected-table")].selected = true;
    selectedTableOption =
      selectTable.options[localStorage.getItem("selected-table")];
  } else {
    selectedTableOption = selectTable.options[selectTable.selectedIndex];
  }

  selectedTable = tables.find((table) => {
    return table.tableId === selectedTableOption.id;
  });
  selectedTableIndex = tables.indexOf(selectedTable);

  selectTable.addEventListener("change", () => {
    console.log(selectedTable);
    console.log(selectedTableIndex);
    setSelectedTable();
  });

  getFormInputs();
  displayMainForm();
}
