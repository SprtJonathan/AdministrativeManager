const lsTables = JSON.parse(localStorage.getItem("tables"));
const lsPolls = JSON.parse(localStorage.getItem("polls"));

let isSpaceProtected = false;
let allowAccess = true;

const setTableNumber = () => {
  const tableNumberElement = document.getElementById("table-number");

  let tableNumber = 0;
  if (lsTables != null) {
    if (lsTables.length) {
      tableNumber = lsTables.length;
    }
  }

  tableNumberElement.textContent = tableNumber;
};

const setPollNumber = () => {
  const pollNumberElement = document.getElementById("polls-number");

  let pollNumber = 0;
  if (lsPolls != null) {
    if (lsPolls.length) {
      pollNumber = lsPolls.length;
    }
  }

  pollNumberElement.textContent = pollNumber;
};

const setUserName = () => {
  const usernameElement = document.getElementById("username");

  usernameElement.textContent = "invité";
};

const authUser = () => {
  allowAccess = !allowAccess;
  if (allowAccess == true) {
    initPage();
  }
};

const initPage = () => {
  setUserName();
  setTableNumber();
  setPollNumber();
};

if (isSpaceProtected) {
  authModal(authUser());
} else {
  initPage();
}
