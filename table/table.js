const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const tables = JSON.parse(localStorage.getItem("tables"));
const tableId = urlParams.get("id");
const table = tables.find((table) => table.tableId === tableId);
const tableName = table.tableName;
const objectsForTable = table.tableData;

const filenameInput = document.getElementById("filename-input");
filenameInput.setAttribute("value", tableName);

if (!table) {
  location.href = "./";
}

let tableData = [];

objectsForTable.forEach((line) => tableData.push(line.lineObjects));

// console.log(tableData);

function initPage() {
  // console.log(tables);
  const tableHeaderSection = document.getElementById("table-intro");
  const tableTitle = document.createElement("h1");
  tableTitle.setAttribute("class", "table-title");
  tableTitle.textContent = tableName;

  tableHeaderSection.appendChild(tableTitle);

  if (Array.isArray(tables)) {
    if (tables.length > 0) {
      tables.forEach((table) => {
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
          confirmationModal(
            "delete-table",
            "Êtes-vous sûr de vouloir supprimer le tableau <mark>" +
              table.tableName +
              "</mark>?",
            "Oui, supprimer",
            (e) => {
              console.log("oui");
              deleteTable(tableToDelete);
            }
          );
          console.log(tableToDelete);
        });

        document.getElementById("table-list").appendChild(tableButtonContainer);
      });
    }
  }
}
// Function that handles the deletion of a table
function deleteTable(idOfTable) {
  // We look for the table we want to delete in the global tables array
  const tableToDelete = tables.find((table) => table.tableId === idOfTable);
  // Now we register the table's index
  const tableIndex = tables.indexOf(tableToDelete);
  tables.splice(tableIndex, 1);
  localStorage.setItem("tables", JSON.stringify(tables));
  if (idOfTable === tableId) {
    location.href = "./";
  } else {
    location.reload();
  }
}

function initVariables() {
  let keys = [];
  if (tableData != null || tableData != 0) {
    for (i = 0; i < tableData.length; i++) {
      for (j = 0; j < Object.keys(tableData[i]).length; j++) {
        // console.log(Object.keys(tableData[i])[j]);
        // This verification prevent key duplications
        if (!keys.some((e) => e === Object.keys(tableData[i])[j])) {
          keys.push(Object.keys(tableData[i])[j]);
        }
      }
    }
  }

  return keys;
}

const tableColumns = initVariables();

let state = 0;
function createTable(data, sortBy) {
  sortTable(sortBy);

  const table = document.createElement("table");
  table.setAttribute("id", "table");
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  tr.setAttribute("id", "tableColumnsContainer");
  for (i = 0; i < tableColumns.length; i++) {
    const th = document.createElement("th");
    th.setAttribute("id", tableColumns[i] + "sort");
    th.setAttribute("class", "table-column");
    th.innerText = tableColumns[i];

    // const sortImage = document.createElement("img");
    // sortImage.setAttribute("id", tableColumns[i] + "sortImage");
    // sortImage.setAttribute("src", "./public/assets/img/sort-svgrepo-com.svg");
    // sortImage.setAttribute("width", "14px");
    // th.appendChild(sortImage);

    tr.appendChild(th);
    tr.addEventListener("click", (e) => {
      const sortBy = e.target.innerText;
      document.getElementById("table-container").innerHTML = "";
      createTable(objectsForTable, sortBy);
    });
  }
  thead.appendChild(tr);
  table.appendChild(thead);
  console.log(data);
  const tbody = document.createElement("tbody");
  if (data.length > 0) {
    for (i = 0; i < data.length; i++) {
      const tr = document.createElement("tr");
      tr.setAttribute("id", "tr-line-" + i);
      for (j = 0; j < tableColumns.length; j++) {
        const td = document.createElement("td");
        if (
          data[i][tableColumns[j]] != null &&
          data[i][tableColumns[j]] != ""
        ) {
          td.innerText = data[i][tableColumns[j]];
        } else if (data[i][tableColumns[j]] == "") {
          console.log("oui");
          td.innerText = "/";
        }
        tr.appendChild(td);
      }

      // HTML code that deletes the line
      const tdDelete = document.createElement("td");
      tdDelete.setAttribute("class", "td-delete");
      const deleteLineButton = document.createElement("button");
      deleteLineButton.textContent = "X";

      const lineId = objectsForTable[i].lineId;
      deleteLineButton.addEventListener("click", (e) => {
        confirmationModal(
          "delete-table",
          "Êtes-vous sûr de vouloir supprimer cette ligne du tableau?",
          "Oui, supprimer",
          (e) => {
            deleteTableLine(lineId);
          }
        );
      });

      tdDelete.appendChild(deleteLineButton);

      tr.appendChild(tdDelete);
      tbody.appendChild(tr);
    }
  } else {
    const tr = document.createElement("tr");
    tr.setAttribute('class', "tr-nodata");
    const noDataDiv = document.createElement("div");
    noDataDiv.setAttribute('class', "no-data");
    tr.appendChild(noDataDiv);
    noDataDiv.innerText = "Aucune donnée trouvée";
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  document.getElementById("table-container").appendChild(table);
}

createTable(tableData, tableColumns[0]);

function deleteTableLine(idOfLine) {
  // First we get the line we want to delete
  const lineToDelete = objectsForTable.find((element) => {
    return element.lineId === idOfLine;
  });

  // Then we get the its index in the table objects list
  const lineIndex = objectsForTable.indexOf(lineToDelete);
  objectsForTable.splice(lineIndex, 1);

  // The goal : replace the table with the one with updated lines

  const currentTable = tables.find((table) => table.tableId === tableId);
  // Now we register the table's index
  const tableIndex = tables.indexOf(currentTable);
  // console.log(table);

  tables.splice(tableIndex, 1, table);

  // console.log(tables);
  localStorage.setItem("tables", JSON.stringify(tables));
  location.reload();
}

function searchEntries() {
  let value = document.getElementById("searchbar").value;
  if (value == "") {
    tableData = [];
    objectsForTable.forEach((line) => tableData.push(line.lineObjects));
  } else {
    tableData = [];
    let resultsArray = objectsForTable.filter((entry) => {
      return Object.keys(entry.lineObjects).some((key) =>
        entry.lineObjects[key].toLowerCase().includes(value.toLowerCase())
      );
    });
    if (resultsArray.length === 0) {
      tableData = resultsArray;
    } else {
      resultsArray.forEach((line) => {
        tableData.push(line.lineObjects);
      });
    }
  }
  document.getElementById("table-container").innerHTML = "";
  console.log(tableData);
  console.log(objectsForTable);
  createTable(tableData);
}
function sortTable(keyToSort, previous) {
  console.log("prevous = " + previous + " and now = " + keyToSort);
  if (state == 0) {
    state = 1;
    return objectsForTable.sort((a, b) => {
      if (a[keyToSort] < b[keyToSort]) {
        return -1;
      }
      if (a[keyToSort] > b[keyToSort]) {
        return 1;
      }
      return 0;
    });
  } else {
    state = 0;
    return objectsForTable.sort((a, b) => {
      if (a[keyToSort] < b[keyToSort]) {
        return 1;
      }
      if (a[keyToSort] > b[keyToSort]) {
        return -1;
      }
      return 0;
    });
  }
}

function tableToCSV(e) {
  e.preventDefault();

  const filename = filenameInput.value;

  // Variable to store the final csv data
  let csv_data = [];

  // Get each row data
  let rows = document.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    // Get each column data
    let cols = rows[i].querySelectorAll("td,th");

    // Stores each csv row data
    let csvrow = [];
    for (let j = 0; j < cols.length; j++) {
      // Get the text data of each cell
      // of a row and push it to csvrow
      csvrow.push(cols[j].innerHTML);
    }
    console.log(csvrow);
    console.log(csv_data);
    // Combine each column value with comma
    csv_data.push(csvrow.join(";"));
  }

  // combine each row data with new line character
  csv_data = csv_data.join("\n");
  console.log(csv_data);

  // Call this function to download csv file
  downloadCSVFile(csv_data, filename);
}

function downloadCSVFile(csv_data, filename) {
  console.log(filename);
  if (filename.length == 0) {
    filename = tableName;
  }
  // Create CSV file object and feed our
  // csv_data into it
  CSVFile = new Blob([csv_data], { type: "text/csv" });

  // Create to temporary link to initiate
  // download process
  let temp_link = document.createElement("a");

  // Download csv file
  temp_link.download = filename + ".csv";
  let url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  // This link should not be displayed
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  // Automatically click the link to trigger download
  temp_link.click();
  document.body.removeChild(temp_link);
}

function getFormInputs() {
  const newObjectForm = document.getElementById("newObjectForm");
  if (table.tableInputs != null && table.tableInputs.length > 0) {
    console.log("OUIOUI");
    document.getElementById("mainFormBlock").style.display = "flex";
  } else {
    document.getElementById("mainFormBlock").style.display = "none";
  }
  if (table.tableInputs != null) {
    for (i = 0; i < table.tableInputs.length; i++) {
      const label = document.createElement("label");
      label.setAttribute("for", table.tableInputs[i].name);
      label.innerText = table.tableInputs[i].name;

      const input = document.createElement("input");
      input.setAttribute("name", table.tableInputs[i].name);
      input.setAttribute("type", table.tableInputs[i].type);
      input.setAttribute("id", table.tableInputs[i].name);
      input.setAttribute("class", "new-input");
      input.setAttribute("placeholder", table.tableInputs[i].name);
      if (table.tableInputs[i].required === true) {
        input.setAttribute("required", true);
      }

      const inputDiv = document.createElement("div");
      inputDiv.appendChild(input);

      const newInputDiv = document.createElement("div");
      newInputDiv.setAttribute("class", "form-group");
      newInputDiv.setAttribute("id", input.name + "Group" + i);
      newInputDiv.appendChild(label);
      newInputDiv.appendChild(inputDiv);

      newObjectForm.appendChild(newInputDiv);
    }
  }
}

function submitMainForm(e) {
  e.preventDefault();
  let everyKeys = [];
  let everyValues = [];
  for (i = 0; i < table.tableInputs.length; i++) {
    everyKeys.push(table.tableInputs[i].name);
    everyValues.push(document.getElementById(table.tableInputs[i].name).value);
  }
  let newObject = { lineId: "line-" + Date.now(), lineObjects: {} };
  everyKeys.forEach((key, i) => (newObject.lineObjects[key] = everyValues[i]));
  console.log(newObject);

  if (table.tableData === null) {
    let newArray = [];
    newArray.push(newObject);

    table.tableData = newArray;
    localStorage.setItem("tables", JSON.stringify(tables));
  } else {
    let newArray = table.tableData.concat([newObject]);
    console.log(newArray);

    table.tableData = newArray;
    localStorage.setItem("tables", JSON.stringify(tables));
  }
  location.reload();
}

getFormInputs();

initPage();
