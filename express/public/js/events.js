import { fireStoreDb, getEvents } from "./firebase.js";
const eventDb = await getEvents(fireStoreDb);

const docMonth = document.getElementById("month"),
  docDays = document.getElementById("calendar"),
  docDetails = document.getElementById("detailsBoxes");

let date = new Date(),
  year = date.getFullYear(),
  month = date.getMonth();

const checkEvent = function () {
  let events = [];
  for (let i = 0; i < eventDb.length; i++) {
    const element = eventDb[i];

    if (
      element.start[2] < year ||
      (element.start[2] == year && element.end[1] <= month + 1)
    ) {
      if (
        element.end[2] > year ||
        (element.end[2] == year && element.end[1] >= month + 1)
      ) {
        events.push(element);
      }
    }
  }

  return events;
};

const monthlist = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = function (events) {
  docMonth.innerText = `${monthlist[month]} ${year}`;
  let inner = "";

  let lastDateOfMonth = new Date(year, month + 1, 0).getDate(),
    firstDayOfMonth = new Date(year, month, 0).getDay(),
    lastDateOfPreviousMonth = new Date(year, month, 0).getDate(),
    lastDayOfMonth = new Date(year, month + 1, 0).getDay();
  for (let i = firstDayOfMonth; i > 0; i--) {
    inner += `<div class="block"><h5 class="a">${
      lastDateOfPreviousMonth + 1 - i
    }</h5></div>`;
  }
  for (let i = 1; i <= lastDateOfMonth; i++) {
    let isInEvent = false;
    for (let j = 0; j < events.length; j++) {
      const element = events[j];
      if (element.start[2] < year || element.start[1] < month + 1) {
        if (element.end[2] > year || element.end[1] > month + 1) {
          isInEvent = true;
        } else if (i <= element.end[0]) {
          isInEvent = true;
        }
      } else if (i >= element.start[0]) {
        if (element.end[2] > year || element.end[1] > month + 1) {
          isInEvent = true;
        } else if (i <= element.end[0]) {
          isInEvent = true;
        }
      }
    }
    if (isInEvent) {
      inner += `<div class="block"><h5 class="c">${i}</h5></div>`;
    } else {
      inner += `<div class="block"><h5 class="b">${i}</h5></div>`;
    }
  }
  for (let i = lastDayOfMonth; i < 7; i++) {
    inner += `<div class="block"><h5 class="a">${
      i - lastDayOfMonth + 1
    }</h5></div>`;
  }
  docDays.innerHTML = inner;
};

const renderDetail = function (events) {
  let inner = "";
  for (let i = 0; i < events.length; i++) {
    const element = events[i];
    inner += `<div class="details"><div class="top"><h4 class="name">${element.name}</h4><h4 class="date">${element.start[0]}/${element.start[1]}/${element.start[2]}-${element.end[0]}/${element.end[1]}/${element.end[2]}</h4></div><h6 class="detail">${element.details}</h6></div>`;
  }
  console.log(inner);
  docDetails.innerHTML = inner;
};

const events = checkEvent();
renderCalendar(events);
renderDetail(events);
