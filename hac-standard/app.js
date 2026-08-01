const openButton = document.getElementById("open-sidebar-button");
const navmenu = document.getElementById("navmenu");
const overlay = document.getElementById("overlay");

// const media = window.matchMedia("(width < 910px)");
// media.addEventListener("change", (e) => updatenavmenu(e));

// function updatenavmenu(e) {
//   const isMobile = e.matches;
//   if (isMobile) {
//     // on mobile, inert should reflect whether the menu is currently closed
//     navmenu.toggleAttribute("inert", !isMenuOpen);
//   } else {
//     // desktop: always interactive
//     navmenu.removeAttribute("inert");
//   }
// }

// Get the button element by its ID
const navToggle = document.getElementById("navicon");
const nav = document.querySelector("nav");

// Add an event listener
function toggleMenu() {
  navToggle.addEventListener("click", function () {
    // You can define the toggle logic here or call a separate function
    nav.classList.toggle("show");
  });
}
toggleMenu();

function closeMenu() {
  overlay.addEventListener("click", function () {
    nav.classList.remove("show");
  });
}
closeMenu();

// function openSidebar() {
//   navmenu.classList.add("show");
//   openButton.setAttribute("aria-expanded", "true");
//   navmenu.removeAttribute("inert");
// }

// function closeSidebar() {
//   navmenu.classList.remove("show");
//   openButton.setAttribute("aria-expanded", "false");
//   navmenu.setAttribute("inert", "");
// }

// For Bookmark Links
// const navLinks = document.querySelectorAll('nav a')
// navLinks.forEach(link => {
//   link.addEventListener('click', () => {
//     closeSidebar()
//   })
// })

updatenavmenu(media);
