"use strict";
function log() {
  const url =
    "https://it-academy-js-api-zmicerboksha.vercel.app/api/5/vh/postcard";
  const formAdmin = document.querySelector("form.admin_form");
  const inputTitle = document.querySelector("input#title");
  const inputPrice = document.querySelector("input#price");
  const inputStatus = document.querySelector("input#status");
  const inputFile = document.querySelector("input#file");

  function clear() {
    inputStatus.value = "";
    inputTitle.value = "";
    inputPrice.value = "";
    inputFile.value = "";
  }

  formAdmin.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formAdmin);
    formData.set("status", inputStatus.checked);
    fetch(url, {
      method: "post",
      body: formData,
    })
      .then((responce) => responce.json())
      .then((res) => {
        setTimeout(() => {
          alert("Postcard added");
        }, 100);
        clear();
      })
      .catch((err) => {
        alert.error(err);
      });
  });
}
log();
