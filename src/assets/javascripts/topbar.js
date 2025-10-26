console.log("topbar!");

const iconMobile = document.querySelector(".header-menu-icon");
const headerMenu = document.querySelector(".header-menu");
let isMenuOpen = false;
let mobileMenuDOM;

function createMobileMenu() {
  //   mobileMenuDOM = document.createElement("ul");
  //   mobileMenuDOM.classList.add("mobile-menu");
  mobileMenuDOM = headerMenu.querySelector("ul").cloneNode(true);
  mobileMenuDOM.classList.add("mobile-menu");
  mobileMenuDOM.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  //   mobileMenuDOM.append(headerMenu.querySelector("ul").cloneNode(true));
  //   headerMenu.append(mobileMenuDOM);
  headerMenu.append(mobileMenuDOM);
}

function closeMenu() {
  mobileMenuDOM.classList.remove("open");
}

function openMenu() {
  if (mobileMenuDOM) {
  } else {
    createMobileMenu();
  }

  mobileMenuDOM.classList.add("open");
}

function toggleMobileMenu() {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
  isMenuOpen = !isMenuOpen;
}
iconMobile.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleMobileMenu();
});

window.addEventListener("click", (event) => {
  if (isMenuOpen) {
    toggleMobileMenu();
  }
});

window.addEventListener("resize", (event) => {
  console.log(window.innerWidth);
  if (window.innerWidth > 480 && isMenuOpen) {
    toggleMobileMenu();
  }
});
