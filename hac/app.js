// Get the button element by its ID
const navToggle = document.getElementById("navicon");
const nav = document.querySelector(".hac-nav-grid");

// Add an event listener
function toggleMenu() {
  navToggle.addEventListener("click", function () {
    // You can define the toggle logic here or call a separate function
    nav.classList.toggle("show");
  });
}
toggleMenu();

const today = new Date();
const holiday = new Date("1989/07/04");
const holidayDay = holiday.getDate();
const date = today.toLocaleDateString();
const day = today.getDay();
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dateToday = document.getElementById("dateToday");
const dayofWeek = document.getElementById("dayofWeek");
const hoursClub = document.getElementById("hoursClub");
const hoursWellness = document.getElementById("hoursWellness");
const hoursKids = document.getElementById("hoursKids");
const nameClub = "Main Building";
const nameWellness = "Wellness Studios";
const nameKids = "Kid\'s Club";

function hours() {
  dateToday.textContent = `${date}`;
  dayofWeek.textContent = `${dayNames[day] + ": Hours"}`;
  if (day == 0 || day == 6) {
    hoursClub.textContent = `${nameClub + ": 5am - 9pm"}`;
    hoursWellness.textContent = `${nameWellness + ": 8am - 11am"}`;
    hoursKids.textContent = `${nameKids + ": 8am -2pm"}`;
  } else if (day == 5) {
    hoursClub.textContent = `${nameClub + ": 5am - 10pm"}`;
    hoursWellness.textContent = `${nameWellness + ": 8am - 11am"}`;
    hoursKids.textContent = `${nameKids + ": 8am - 1pm"}`;
  } else {
    hoursClub.textContent = `${nameClub + ": 5am - 11pm"}`;
    hoursWellness.textContent = `${nameWellness + ": 8am - 2pm & 5pm - 8pm"}`;
    hoursKids.textContent = `${nameKids + ": 8am - 7pm"}`;
  }
  console.log(holiday);
}
hours();
