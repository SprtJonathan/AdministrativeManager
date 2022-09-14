const localStorageContent = JSON.parse(localStorage.getItem("data"));

let objectsForTable = localStorageContent;

function initVariables() {
  let keys = [];
  if (localStorageContent != null) {
    if (localStorageContent.length != 0) {
      for (i = 0; i < localStorageContent.length; i++) {
        for (j = 0; j < Object.keys(localStorageContent[i]).length; j++) {
          console.log(Object.keys(localStorageContent[i])[j]);
          // This verification prevent key duplications
          if (!keys.some((e) => e === Object.keys(localStorageContent[i])[j])) {
            keys.push(Object.keys(localStorageContent[i])[j]);
          }
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

    const sortImage = document.createElement("img");
    sortImage.setAttribute("id", tableColumns[i] + "sortImage");
    sortImage.setAttribute("src", "./public/assets/img/sort-svgrepo-com.svg");
    sortImage.setAttribute("width", "14px");
    th.appendChild(sortImage);

    tr.appendChild(th);
    tr.addEventListener("click", (e) => {
      const sortBy = e.target.innerText;
      document.getElementById("table-container").innerHTML = "";
      createTable(objectsForTable, sortBy);
    });
  }
  thead.appendChild(tr);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  for (i = 0; i < data.length; i++) {
    const tr = document.createElement("tr");
    for (j = 0; j < tableColumns.length; j++) {
      const td = document.createElement("td");
      if (data[i][tableColumns[j]] != null) {
        td.innerText = data[i][tableColumns[j]];
      } else {
        td.innerText = "/";
      }

      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  document.getElementById("table-container").appendChild(table);
}

createTable(objectsForTable, tableColumns[0]);

function searchEntries() {
  let value = document.getElementById("searchbar").value;
  if (value == "") {
    objectsForTable = localStorageContent;
  } else {
    objectsForTable = localStorageContent.filter((entry) => {
      return Object.keys(entry).some((key) =>
        entry[key].toLowerCase().includes(value.toLowerCase())
      );
    });

    console.log(objectsForTable);
  }
  document.getElementById("table-container").innerHTML = "";
  createTable(objectsForTable);
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
