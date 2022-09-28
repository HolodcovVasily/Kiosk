"use strict";

//Pagination on Home Page
const url =
  "https://it-academy-js-api-zmicerboksha.vercel.app/api/5/vh/postcard?size=20&page=0&orderBy=id,asc";

const pagesSelect = document.querySelector("#pagesSelect");
const inputSearch = document.querySelector(
  "input.form-control.rounded.input-search"
);
const flexPhotoItems = document.querySelector(".flexPhoto__items");
const ulPagination = document.querySelector("ul.pagination.pagination-lg");

let postcardWrapper;
let numberPage = 1;
let sortableElement;
let sortFrom = "asc";
let liStyled;
let order;

let poscardInCart = { id: "", title: "", image_link: "", price: "", count: 0 };

function getPostcards(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => response.content)
    .then((postcards) => {
      postcards.forEach((card) => {
        card.status === true ? (order = "in stock") : (order = "out of stock");
        postcardWrapper = document.createElement("div");
        postcardWrapper.classList.add("flexPhoto__item", "added");
        postcardWrapper.innerHTML = `<div class="historyPhoto__box" data-info = ${card.id}>
          <a href="#" title= ${card.title} >
            <img
              src= ${card.image_link}
              alt=${card.title}
            />
          </a>
        </div>
        <h2>PRICE: ${card.price} $</h2>
        <p>${card.title}</p>
        <p>${order}</p>
        <a class="button add_to_cart" href="#" target="_self">Add to cart </a>
      </div>`;
        flexPhotoItems.append(postcardWrapper);
      });

      document.querySelectorAll(".flexPhoto__item a").forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
        });
      });
      //adding to cart

      document.querySelectorAll(".add_to_cart").forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          let info = item.parentElement.firstChild.dataset.info;
          console.log(info);

          localStorage.setItem("orderId", info);
        });
      });
    });
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => response.totalPages)
    .then((lengthPages) => {
      for (let i = 0; i < lengthPages; i++) {
        let newLi = document.createElement("li");
        newLi.classList.add("page-item");
        newLi.innerHTML = `<a class="page-link" title="Перейти на страницу ${
          i + 1
        }" href="#">${i + 1}</a>`;
        ulPagination.append(newLi);
      }
      let pageLink = document.querySelectorAll("a.page-link");
      pageLink.forEach((a) => {
        if (a.innerHTML === liStyled) {
          a.classList.add("marked");
        }
      });

      pageLink.forEach((a) => {
        a.addEventListener("click", (event) => {
          numberPage = +event.target.innerHTML;
          //liStyled переменная для оформления текущей страницы
          liStyled = event.target.innerHTML;
          removeTr();
          changeUrl();
          numberPage = 1;
        });
      });

      pageLink.forEach((a) => {
        a.addEventListener("click", (event) => {
          event.preventDefault();
        });
      });
    });
}
getPostcards(url);

function removeTr() {
  let added = document.querySelectorAll(".added");
  added.forEach((elem) => {
    elem.remove();
  });
  let pageItem = document.querySelectorAll(".page-item");
  pageItem.forEach((elem) => {
    elem.remove();
  });
}

function changeUrl() {
  getPostcards(
    `${url.slice(0, url.indexOf("size"))}&size=${pagesSelect.value}&page=${
      numberPage - 1
    }`
  );
}

pagesSelect.addEventListener("change", () => {
  removeTr();
  changeUrl();
});
