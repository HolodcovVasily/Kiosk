"use strict";
//SPA KIOSK WEBSITE

function spaKiosk() {
  const admin = {
    loginAdminEnter: "vasil.holodcov@gmail.com",
    passwordAdminEnter: "777",
  };

  let userValues = {
    enter: "",
    isEnter: "",
  };

  const home = document.querySelector("#home");
  const loginPage = document.querySelector("#login_page");
  const adminPage = document.querySelector("#admin_page");
  const cartPage = document.querySelector("#cart_page");

  const loginButtonLogin = document.querySelector("#login_btn_login");
  const exitButtonLogin = document.querySelector("#login_btn_exit");
  const exitButtonAdmin = document.querySelector("#admin_btn_exit");
  const exitButtonCart = document.querySelector("#cart_btn_exit");
  const formAdmin = document.querySelector("form.admin_form");
  const formLogin = document.querySelector("form.login_form");
  const inputLogin = document.querySelector("input.input_login");
  const inputPassword = document.querySelector("input.input_password");
  const enterToAdmin = document.querySelector("#enter_admin");

  enterToAdmin.addEventListener("click", (event) => {
    userValues.enter = event.target.innerHTML;
  });

  exitButtonLogin.addEventListener("click", () => {
    location.hash = "#home";
    userValues.enter = "";
    userValues.isEnter = "";
    inputLogin.value = "";
    inputPassword.value = "";
  });
  exitButtonAdmin.addEventListener("click", () => {
    location.hash = "#home";
    inputLogin.value = "";
    inputPassword.value = "";
  });
  exitButtonCart.addEventListener("click", () => {
    location.hash = "#home";
  });

  const isAdmin = () => {
    if (
      inputLogin.value === admin.loginAdminEnter &&
      inputPassword.value === admin.passwordAdminEnter
    ) {
      location.hash = "#admin_page";
    } else {
      alert("Wrong password!");
      location.hash = "#login_page";
      //!!!!!!!!!!!!!!!!!!!!!!!!!!прописать правила не корректного логина
    }

    if (inputLogin.value === "" || inputPassword.value === "") {
      location.hash = "#login_page";
    }
  };

  const changeLocation = () => {
    home.style.display = "none";
    loginPage.hidden = true;
    adminPage.hidden = true;
    cartPage.hidden = true;

    switch (location.hash) {
      case "#home":
        home.style.display = "grid";
        break;
      case "#login_page":
        userValues.enter === "Login"
          ? (location.hash = "#login_page")
          : (location.hash = "#home");
        loginPage.hidden = false;
        break;
      case "#admin_page":
        isAdmin();
        adminPage.hidden = false;
        break;
      case "":
        location.hash = "#home";
        home.style.display = "grid";
        break;

      case "#cart_page":
        location.hash = "#cart_page";
        cartPage.hidden = false;
        break;

      default:
        home.style.display = "grid";
        break;
    }
  };

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    isAdmin();
  });

  loginButtonLogin.addEventListener("click", (e) => {
    userValues.isEnter = e.target.innerHTML;
  });

  window.addEventListener("hashchange", changeLocation);
  changeLocation();
}
spaKiosk();
