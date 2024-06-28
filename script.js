// ############# signup Page ################## \\
let signupBtn = document.querySelector("#signup");

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formvalidation();
});

let userSignupData = [];

function saveDataToLocalStorage() {
  localStorage.setItem("saveData", JSON.stringify(userSignupData));
}
function loadDataToLocalStorage() {
  let recieveData = localStorage.getItem("saveData");
  if (recieveData) {
    userSignupData = JSON.parse(recieveData);
  }
}
loadDataToLocalStorage();

function formvalidation() {
  let username = document.querySelector("#username").value.trim();
  let email = document.querySelector("#email").value.trim();
  let password = document.querySelector("#password").value.trim();
  let confirmPassword = document.querySelector("#confirmPassword").value.trim();
  let userRegex = /^[a-zA-Z0-9_-]+$/;
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    swal.fire("please fill the required field");
    return;
  }
  if (username.length > 15 || username.length < 3) {
    swal.fire("username should be 3 to 15 character");
    return;
  }
  if (!userRegex.test(username)) {
    swal.fire("please enter valid username");
    return;
  }
  if (!emailRegex.test(email)) {
    swal.fire("please enter a valid email address");
    return;
  }
  if (password.length < 6 || password.length > 8) {
    swal.fire("Password must be 6 or 8 character");
    return;
  }
  if (confirmPassword.length < 6 || confirmPassword.length > 8) {
    swal.fire("Password must be 6 or 8 character");
    return;
  }
  if (confirmPassword !== password) {
    swal.fire("password doesn't matched");
  }

  let userExists = userSignupData.some((user) => user.email === email);

  if (userExists) {
    swal.fire("user already exists");
    return;
  }
  let newUser = {
    username: username,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  userSignupData.push(newUser);
  saveDataToLocalStorage();

  // ################ login signup pages ################### \\

  let loginPage = document.querySelector("#loginPage");
  let signupPage = document.querySelector("#signupPage");

  swal.fire("Registration Successful");
  setTimeout(() => {
    loginPage.style.display = "flex";
    signupPage.style.display = "none";
  }, 1500);
  
}

// ################### login page ######################## \\

let loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  userDataFound();
});

function userDataFound() {
  let userEmail = document.querySelector("#useremail").value;
  let userPassword = document.querySelector("#userpass").value;

  let userFound = userSignupData.some(
    (data) =>
      (data.email === userEmail || data.username === userEmail) &&
      data.password === userPassword
  );

  if (userFound) {
    swal.fire("Login Successfully");
    setTimeout(() => {
      location.href = "./kanban.html";
    }, 1500);
  } else {
    swal.fire("invalid email or password");
  }

  userEmail.value = "";
  userPassword.value = "";
}

// ############ #### page Changing ############## \\

let loginPage = document.querySelector("#loginPage");
let signupPage = document.querySelector("#signupPage");
let lPageBtn = document.querySelector("#lpagebtn");
let sPageBtn = document.querySelector("#spagebtn");

lPageBtn.addEventListener("click", (e) => {
  e.preventDefault();
  convertLoginPage();
});

function convertLoginPage() {
  if ((loginPage.style.display = "none")) {
    loginPage.style.display = "flex";
    signupPage.style.display = "none";
  }
}

sPageBtn.addEventListener("click", (e) => {
  e.preventDefault();
  convertsignupPage();
});

function convertsignupPage() {
  if ((loginPage.style.display = "flex")) {
    loginPage.style.display = "none";
    signupPage.style.display = "flex";
  }
}
