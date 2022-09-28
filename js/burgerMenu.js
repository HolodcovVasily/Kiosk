"use strict";
//Adding Burger Menu
function bergerMenu() {
  let header__burgerMenu = document.querySelector(".header__burgerMenu");
  let container__menu = document.querySelector(".container__menu");
  let back = document.querySelector("body");
  let menu = document.querySelector(".menu");

  header__burgerMenu.onclick = function () {
    header__burgerMenu.classList.toggle("showBurger");
    container__menu.classList.toggle("showBurger");
    back.classList.toggle("lock");
  };

  menu.onclick = function () {
    menu.classList.remove("showBurger");
  };
}
bergerMenu();
