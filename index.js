const setTableNumber = () => {
  const tableNumberElement = document.getElementById("table-number");

  let tableNumber = 0;
  if (localStorage.getItem("tables").length) {
    tableNumber = localStorage.getItem("tables").length;
  }

  tableNumberElement.textContent = tableNumber;
};

setTableNumber();
