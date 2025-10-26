import "/assets/style/style.scss";
import "/assets/style/index.scss";
import "/assets/javascripts/topbar.js";

console.log("accueil");

const articleContainerElement = document.querySelector(".articles-container");

function createArticles(articles) {
  const articlesDOM = articles.map((article) => {
    const articleDOM = document.createElement("article");
    articleDOM.classList.add("article");
    articleDOM.innerHTML = `
            <img src="${article.img}" alt="fake author">
            <h2>${article.title} - ${article.category}</h2>
            <p class="article-author">${article.author}</p>
            <p class="article-content">${article.content}</p>

            <div class="options">
                <button class="btn btn-danger" data-id=${article._id}>Supprimer</button>
                <button class="btn btn-primary">Modifier</button>
            </div>`;
    return articleDOM;
  });
  console.log(articlesDOM);

  articleContainerElement.innerHTML = "";
  articleContainerElement.append(...articlesDOM);
  const deleteButtons = articleContainerElement.querySelectorAll(".btn-danger");
  console.log(deleteButtons);
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

async function fetchArticle() {
  try {
    const response = await fetch(
      "https://restapi.fr/api/dymajscertificationarticles"
    );
    const articles = await response.json();
    console.log(articles);
    createArticles(articles);
  } catch (e) {
    console.log("e ", e);
  }
}

fetchArticle();
