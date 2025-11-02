import "/assets/style/style.scss";
import "/assets/style/index.scss";
import "/assets/javascripts/topbar.js";

const articleContainerElement = document.querySelector(".articles-container");
const categoriesContainerElement = document.querySelector(".categories");

function createArticles(articles) {
  const articlesDOM = articles.map((article) => {
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
    });
  });
}

function displayMenuCategories(articlesArray) {
  const liElements = articlesArray.map((categoryElem) => {
    const li = document.createElement("li");
    li.innerHTML = `${categoryElem.at(0)}  ( <strong>${categoryElem.at(
      1
    )}</strong> )`;
    return li;
  });
  console.log("allo", liElements);
  categoriesContainerElement.innerHTML = "";
  categoriesContainerElement.append(...liElements);
}

function createMenuCategories(articles) {
  console.log(articles);
  const categories = articles.reduce((accumulator, article) => {
    console.log(accumulator[article.category]);
    if (accumulator[article.category]) {
      accumulator[article.category]++;
    } else {
      accumulator[article.category] = 1;
    }
    return accumulator;
  }, {});
  // console.log(categories);
  const categoriesArray = Object.keys(categories).map((category) => {
    return [category, categories[category]];
  });
  displayMenuCategories(categoriesArray);
  // console.log(categoriesArray);
}

async function fetchArticle() {
  try {
    const response = await fetch(
      "https://restapi.fr/api/dymajscertificationarticles"
    );
    const articles = await response.json();
    createArticles(articles);
    createMenuCategories(articles);
  } catch (e) {
    console.log("e ", e);
  }
}

fetchArticle();
