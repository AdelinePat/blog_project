import "/assets/style/style.scss";
import "/assets/style/form.scss";

console.log("form!");

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  // console.log(formData);

  const entries = formData.entries();
  //   console.log(entries);
  //   for (let entry of entries) {
  //     console.log(entry);
  //   }

  //   const obj = Array.from(entries).reduce( (acc, value) => {
  //     acc[value[0]] = value[1];
  //     return acc;
  //   }, {})

  const obj = Object.fromEntries(entries);
  const json = JSON.stringify(obj);
  console.log(json);
  console.log(obj);

  //   const arrayData = Array.from(entries);
  //   console.log(arrayData);
});
