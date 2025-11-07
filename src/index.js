import "./assets/style/style.scss";
import "./assets/style/index.scss";
import "./assets/javascripts/topbar.js";
import { openModal } from "./assets/javascripts/modal.js";
import { fakeArticles } from "./assets/javascripts/article.js";

console.log("INDEX.JS !!");
const articleContainerElement = document.querySelector(".articles-container");
const categoriesContainerElement = document.querySelector(".categories");
const selectElement = document.querySelector("select");

let filter;
let articles;
let sortBy = "desc";

selectElement.addEventListener("change", () => {
  sortBy = selectElement.value;
  fetchArticle();
  console.log(articles);
});

function createArticles() {
  const articlesDOM = articles
    .filter((article) => {
      if (filter) {
        return filter === article.category;
      } else {
        return true;
      }
    })
    .map((article) => {
      const articleDOM = document.createElement("article");
      articleDOM.classList.add("article");
      articleDOM.innerHTML = `
            <img src="${article.img}" alt="fake author">
            <h2>${article.title}</h2>
            <p class="article-author">${article.author} - ${new Date(
        article.createdAt
      ).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}</p>
            <p class="article-content">${article.content}</p>

            <div class="options">
                <button class="btn btn-danger" data-id=${
                  article._id
                }>Supprimer</button>
                <button data-id=${
                  article._id
                } class="btn btn-primary">Modifier</button>
            </div>`;
      return articleDOM;
    });

  articleContainerElement.innerHTML = "";
  articleContainerElement.append(...articlesDOM);
  const deleteButtons = articleContainerElement.querySelectorAll(".btn-danger");
  const updateButtons =
    articleContainerElement.querySelectorAll(".btn-primary");

  updateButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const target = event.target;
      const articleId = target.dataset.id;
      location.assign(`/form/form.html?id=${articleId}`);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      console.log("supprimer!");
      const result = await openModal(
        "Etes vous sûr de vouloir supprimer cet article ?"
      );
      console.log(result);
      if (result === true) {
        try {
          const target = event.target;
          const articleId = target.dataset.id;
          const response = await fetch(
            `https://restapi.fr/api/dymajscertificationarticles/${articleId}`,
            {
              method: "DELETE",
            }
          );
          const body = await response.json();
          fetchArticle();
        } catch (e) {
          console.log("e ", e);
        }
      }
    });
  });
}

function displayMenuCategories(articlesArray) {
  const liElements = articlesArray.map((categoryElem) => {
    const li = document.createElement("li");
    li.innerHTML = `${categoryElem.at(0)}  ( <strong>${categoryElem.at(
      1
    )}</strong> )`;
    if (categoryElem.at(0) === filter) {
      li.classList.add("active");
      createArticles();
    }
    li.addEventListener("click", (event) => {
      if (filter === categoryElem.at(0)) {
        filter = null;
        createArticles();
      } else {
        filter = categoryElem.at(0);
        liElements.forEach((li) => {
          li.classList.remove("active");
        });
        li.classList.add("active");
        createArticles();
      }

      console.log(filter);
    });
    return li;
  });
  categoriesContainerElement.innerHTML = "";
  categoriesContainerElement.append(...liElements);
}

function createMenuCategories() {
  const categories = articles.reduce((accumulator, article) => {
    if (accumulator[article.category]) {
      accumulator[article.category]++;
    } else {
      accumulator[article.category] = 1;
    }
    return accumulator;
  }, {});
  const categoriesArray = Object.keys(categories)
    .map((category) => {
      return [category, categories[category]];
    })
    .sort((category1, category2) => {
      return category1.at(0).localeCompare(category2.at(0));
    });
  displayMenuCategories(categoriesArray);
}

// async function fetchArticle() {
//   try {
//     const response = await fetch(
//       `https://restapi.fr/api/dymajscertificationarticles?sort=createdAt:${sortBy}`
//     );
//     console.log("in fetcharticles");
//     articles = await response.json();
//     createArticles();
//     createMenuCategories();
//   } catch (e) {
//     console.log("e ", e);
//   }
// }

async function fetchArticle() {
  console.log("1. in fetcharticle");
  try {
    let response = await fetch(
      `https://restapi.fr/api/dymajscertificationarticles?sort=createdAt:${sortBy}`
    );
    console.log("2. after timeout fetching article");
    console.log("2.1", response);
    articles = await response.json();
    if (articles.length === 0) {
      try {
        for (const article of fakeArticles) {
          console.log("3. in fakeArticle loop");
          const json = JSON.stringify(article);
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
        console.log("4. after fakearticle loop");
        response = await fetch(
          `https://restapi.fr/api/dymajscertificationarticles?sort=createdAt:${sortBy}`
        );
        articles = await response.json();
        console.log("5. fetch after post");
      } catch (postError) {
        console.log("Failed to repopulate API", postError);
      }
    }
    console.log("6. before .json()");
    console.log("6.1", articles);
    console.log("7. after .json()");
  } catch (e) {
    // Timeout or network error
    console.log("Request failed or timed out. Using fake articles.");
    // articles = fakeArticles;
  }

  console.log("8. before createArticle");

  createArticles();
  createMenuCategories();
  console.log("9. end of fetcharticle");
}

console.log("0. before fetcharticle");
fetchArticle();
