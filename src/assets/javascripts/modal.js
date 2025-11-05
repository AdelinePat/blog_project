const body = document.querySelector("body");
let layer;
let modal;
// let cancelBtn;
// let confirmBtn;

export function openModal(question) {
  createLayer();
  createModal(question);
  layer.append(modal);
  body.append(layer);

  return new Promise((resolve, reject) => {
    layer.addEventListener("click", (event) => {
      if (
        !modal.contains(event.target) ||
        event.target === modal.querySelector(".btn-secondary")
      ) {
        resolve(false);
        layer.remove();
      } else if (event.target === modal.querySelector(".btn-primary")) {
        console.log("confirm!!!");
        layer.remove();
        resolve(true);
      }
    });
  });
}

function createLayer() {
  layer = document.createElement("div");
  layer.classList.add("layer");
  //   layer.addEventListener("click", (event) => {
  // if (!modal.contains(event.target)) {
  //   layer.remove();
  // }
  //   });
}

function createModal(question) {
  modal = document.createElement("div");
  modal.classList.add("modal");

  const questionParagraph = document.createElement("p");
  const textQuestion = document.createTextNode(question);
  questionParagraph.append(textQuestion);

  const confirmBtn = createButton("Confirmer");
  confirmBtn.classList.add("btn", "btn-primary");
  const cancelBtn = createButton("Annuler");
  cancelBtn.classList.add("btn", "btn-secondary");
  modal.append(questionParagraph);
  modal.append(cancelBtn);
  modal.append(confirmBtn);
}

function createButton(text) {
  const delText = document.createTextNode(text);
  const btn = document.createElement("button");
  btn.append(delText);
  return btn;
}
