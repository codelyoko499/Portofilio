const signUpBtn = document.getElementById("signUpBtn");
const signInBtn = document.getElementById("signInBtn");
const tableBody = document.getElementById("tableBody");
const userArr = [];

const saveToLocalstorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getFromLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

const loadTableFromLocalStorage = () => {
  const storedUserArr = getFromLocalStorage("userArr");
  if (storedUserArr) {
    userArr.push(...storedUserArr);
    storedUserArr.forEach((user) => addRowToTable(user, "Connected"));
  }
};

const addRowToTable = (user, status) => {
  const tr = document.createElement("tr");
  tableBody.appendChild(tr);
  tr.innerHTML += `
        <td class="fNameCell">${user.fName}<br/></td>
        <td class="lNameCell">${user.lName}<br/></td>
        <td class="emailCell">${user.email}<br/></td>
        <td class="passwordCell">${user.password}<br/></td>
        <td class="statusCell">${status}</td>
        <td><button class="disconnectBtn">Disconnect</button></td>
        <td><button class="deleteBtn">Delete</button></td>
        <td><button class="editBtn">Edit</button></td>
    `;

  tr.addEventListener("click", handleButtonClick);
  saveUserInArr(user);
};

const handleButtonClick = (event) => {
  const target = event.target;
  const tr = target.closest("tr");
  if (!tr) return;

  const userIndex = Array.from(tr.parentElement.children).indexOf(tr);

  if (target.classList.contains("deleteBtn")) {
    tr.remove();
  } else if (target.classList.contains("disconnectBtn")) {
    handleDisconnect(tr);
  } else if (target.classList.contains("editBtn")) {
    handleEdit(tr);
  }

  saveTableToLocalStorage();
};

const handleDisconnect = (tr) => {
  const statusCell = tr.querySelector(".statusCell");
  if (statusCell) {
    statusCell.innerHTML = "Disconnected";
    tr.querySelector(".disconnectBtn").disabled = true;
  } else {
    alert(`Couldn't find the status cell`);
  }
};

const handleEdit = (tr) => {
  const fNameCell = tr.querySelector(".fNameCell");
  const lNameCell = tr.querySelector(".lNameCell");
  const emailCell = tr.querySelector(".emailCell");
  const passwordCell = tr.querySelector(".passwordCell");

  if (fNameCell && lNameCell && emailCell && passwordCell) {
    const newFirstName = prompt("Enter the new first name", fNameCell.innerText.trim());
    const newLastName = prompt("Enter the new last name", lNameCell.innerText.trim());
    const newEmail = prompt("Enter the new email", emailCell.innerText.trim());
    const newPassword = prompt("Enter the new password", passwordCell.innerText.trim());

    if (newFirstName !== null && newLastName !== null && newEmail !== null && newPassword !== null) {
      userArr.forEach((user, index) => {
        if (
          user.fName === fNameCell.innerText.trim() &&
          user.lName === lNameCell.innerText.trim() &&
          user.email === emailCell.innerText.trim() &&
          user.password === passwordCell.innerText.trim()
        ) {
          userArr[index] = {
            fName: newFirstName,
            lName: newLastName,
            email: newEmail,
            password: newPassword,
          };

          fNameCell.innerText = newFirstName;
          lNameCell.innerText = newLastName;
          emailCell.innerText = newEmail;
          passwordCell.innerText = newPassword;

          saveTableToLocalStorage();
        }
      });
    }
  } else {
    alert(`Couldn't find one or more cells for editing`);
  }
};

const saveTableToLocalStorage = () => {
  saveToLocalstorage("userArr", userArr);
};

const signUp = (user) => {
  preventNullValues(user);
  addRowToTable(user, "Connected");
  console.log(userArr);
  saveTableToLocalStorage();
};

if (signUpBtn) {
  signUpBtn.addEventListener("click", () => {
    const user = {
      fName: document.getElementById("fName").value,
      lName: document.getElementById("lName").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    signUp(user);
  });
} else {
  alert(`Couldn't find the button`);
}

const preventNullValues = (user) => {
  if (Object.values(user).some((value) => value === "")) {
    alert("Please fill in all the fields");
    throw new Error("Please fill in all the fields");
  }
};

const saveUserInArr = (user) => {
  userArr.push(user);
  localStorage.setItem("userArr", JSON.stringify(userArr));
  return userArr;
};

const signIn = () => {
  const emailSI = document.getElementById("emailSI").value;
  const passwordSI = document.getElementById("passwordSI").value;

  const user = userArr.find((u) => u.email === emailSI && u.password === passwordSI);

  if (user) {
    const userIndex = userArr.indexOf(user);
    const disconnectBtn = document.querySelectorAll(".disconnectBtn")[userIndex];
    disconnectBtn.disabled = false;

    const statusCell = document.querySelectorAll(".statusCell")[userIndex];
    if (statusCell) {
      statusCell.innerHTML = "Connected";
    } else {
      alert(`Couldn't find the status cell`);
    }
  } else {
    alert(`Email or password is incorrect, please try again!`);
  }
};

if (signInBtn) {
  signInBtn.addEventListener("click", () => {
    signIn();
  });
} else {
  alert(`Couldn't find the button`);
}

loadTableFromLocalStorage();
