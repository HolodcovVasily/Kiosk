"use strict";
///Pagination_on Admin_Page
function PaginationAdminPage() {
  const url =
    "https://it-academy-js-api-zmicerboksha.vercel.app/api/5/vh/postcard?size=20&page=0&orderBy=id,asc";

  const adminSelectPages = document.querySelector(
    "#admin_pagination_select_pages"
  );
  //   console.log(adminSelectPages.value);
  const adminInputSearch = document.querySelector("#admin_search_content");
  const adminbtnSearch = document.querySelector("a.button.search.admin");

  const adminUlPagination = document.querySelector(
    "ul.pagination.pagination-lg.admin"
  );
  //   const adminTHead = document.querySelector("admin_thead");
  const adminTableBody = document.querySelector(
    "table.admin_table_editable tbody"
  );

  let adminTr;
  let adminNumberPage = 1;
  let adminLiStyled;

  function render(card) {
    let checkedValue;
    card.status ? (checkedValue = `checked`) : (checkedValue = "");
    let renderTags = `<td>${card.id}</td>
                <td>
                  <input class="admin_postcadrs_status" type="checkbox" ${checkedValue} />
                </td>
                <td>
                  <div
                    class="admin_postcadrs_img"
                    style="
                      background-image: url(${card.image_link});
                    "
                  ></div>
                </td>
                <td>
                <textarea class="admin_postcard_title">${card.title}</textarea>
                  
                </td>
                <td>
                  <input
                    class="admin_postcard_price"
                    type="number"
                    value="${card.price}"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    class="admin_postcard_close_button"
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="admin_postcard_agree_button"
                  >
                    <i class="fa-regular fa-circle-check"></i>
                  </button>
                </td>`;
    return renderTags;
  }

  function getAdminPostcards(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) => response.content)

      .then((poscards) => {
        console.log(poscards);
        poscards.forEach((card) => {
          adminTr = document.createElement("tr");
          adminTr.classList.add("admin_added_tr");
          adminTr.innerHTML = render(card);
          adminTableBody.append(adminTr);
        });

        //============================DELETE++++PUT========================
        let postcardID;
        document.querySelectorAll(".admin_added_tr").forEach((elem) => {
          elem.addEventListener("click", (event) => {
            postcardID = +elem.firstChild.innerHTML;
            if (event.target.closest("i.fa-solid.fa-xmark")) {
              fetch(`${url.slice(0, url.indexOf("?"))}/${postcardID}`, {
                method: "DELETE",
              }).then(() => {
                alert(`id: ${postcardID} removed`);
                elem.remove();
              });
            } else if (event.target.closest("i.fa-regular.fa-circle-check")) {
              fetch(`${url.slice(0, url.indexOf("?"))}/${postcardID}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  status: elem.querySelector("input.admin_postcadrs_status")
                    .checked,
                  title: elem.querySelector("textarea.admin_postcard_title")
                    .value,
                  price: elem.querySelector("input.admin_postcard_price").value,
                }),
              })
                .then((response) => {
                  return response.json();
                })
                .then((res) => {
                  console.log({ ...res });
                  elem.innerHTML = render(res);
                  setTimeout(() => {
                    alert(`id: ${postcardID} update`);
                  }, 100);
                });
            }
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
          let adminLi = document.createElement("li");
          adminLi.classList.add("admin_page-item");
          adminLi.innerHTML = `<a class="page-link" title="Перейти на страницу ${
            i + 1
          }" href="#">${i + 1}</a>`;
          adminUlPagination.append(adminLi);
        }

        let adminPageLink = document.querySelectorAll(
          ".container_admin a.page-link"
        );
        adminPageLink.forEach((a) => {
          if (a.innerHTML === adminLiStyled) {
            a.classList.add("marked");
          }
        });

        adminPageLink.forEach((a) => {
          a.addEventListener("click", (event) => {
            adminNumberPage = +event.target.innerHTML;
            //liStyled переменная для оформления текущей страницы
            adminLiStyled = event.target.innerHTML;
            removeTr();
            changeUrl();
            adminNumberPage = 1;
          });
        });

        adminPageLink.forEach((a) => {
          a.addEventListener("click", (event) => {
            event.preventDefault();
          });
        });
      });
  }
  getAdminPostcards(url);

  function removeTr() {
    let adminAdded = document.querySelectorAll(".admin_added_tr");
    adminAdded.forEach((elem) => {
      elem.remove();
    });

    let adminPageItem = document.querySelectorAll(".admin_page-item");
    adminPageItem.forEach((elem) => {
      elem.remove();
    });
  }

  function changeUrl() {
    getAdminPostcards(
      `${url.slice(0, url.indexOf("size"))}&size=${
        adminSelectPages.value
      }&page=${adminNumberPage - 1}&search=${adminInputSearch.value}`
    );
  }

  adminSelectPages.addEventListener("change", () => {
    removeTr();
    changeUrl();
  });

  adminbtnSearch.addEventListener("click", () => {
    removeTr();
    changeUrl();
  });
}
PaginationAdminPage();
