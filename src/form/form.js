import "/assets/style/style.scss";
import "/assets/style/form.scss";
import "/assets/javascripts/topbar.js";
import { openModal } from "/assets/javascripts/modal.js";

console.log("form!");

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
const cancelBtn = document.querySelector(".btn-secondary");
let errors = [];
let articleId;

async function initForm() {
  const params = new URL(location.href);
  // console.log("params", params);
  articleId = params.searchParams.get("id");
  if (articleId) {
    const response = await fetch(
      `https://restapi.fr/api/dymajscertificationarticles/${articleId}`
    );
    if (response.status < 300) {
      const article = await response.json();
      fillForm(article);
    }
    // console.log(response);
  }
}

function fillForm(article) {
  const authorInput = document.querySelector("#author");
  const imgInput = document.querySelector("#profile");
  const categoryInput = document.querySelector("#category");
  const titleInput = document.querySelector("#title");
  const contentInput = document.querySelector("#article-content");

  authorInput.value = article.author || "";
  imgInput.value = article.img || "";
  categoryInput.value = article.category || "";
  titleInput.value = article.title || "";
  contentInput.value = article.content || "";
}

// console.log("articleid", articleId);
initForm();

cancelBtn.addEventListener("click", async () => {
  const result = await openModal(
    "Si vous quittez la page, vous allez perdre votre article. Êtes vous sûr de continuer ?"
  );
  if (result) {
    location.assign("/index.html");
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);
      let response;
      if (articleId) {
        response = await fetch(
          `https://restapi.fr/api/dymajscertificationarticles/${articleId}`,
          {
            method: "PATCH",
            body: json,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await fetch(
          "https://restapi.fr/api/dymajscertificationarticles",
          {
            method: "POST",
            body: json,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.status < 300) {
        location.assign("/index.html");
      }

      // const body = await response.json();
      // console.log(body);
    } catch (e) {
      console.error("e: ", e);
    }
  }
});

function formIsValid(article) {
  errors = [];
  if (
    !article.author ||
    !article.category ||
    !article.content ||
    !article.img ||
    !article.title
  ) {
    errors.push("Vous devez renseigner tous les champs");
  } else {
    errors = [];
  }

  if (errors.length) {
    let errorHTML = "";
    errors.forEach((element) => {
      errorHTML += `<li>${element}</li>`;
    });

    errorElement.innerHTML = errorHTML;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
}
