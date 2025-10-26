import "/assets/style/style.scss";
import "/assets/style/form.scss";

console.log("form!");

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
let errors = [];

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);

      const response = await fetch(
        "https://restapi.fr/api/dymajscertificationarticles",
        {
          method: "POST",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const body = await response.json();
      console.log(body);
    } catch (e) {
      console.error("e: ", e);
    }
  }
});

function formIsValid(article) {
  if (!article.author || !article.category || !article.content) {
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
