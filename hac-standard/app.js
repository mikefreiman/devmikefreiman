const openButton = document.getElementById("open-sidebar-button");
const navmenu = document.getElementById("navmenu");
const overlay = document.getElementById("overlay");

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
