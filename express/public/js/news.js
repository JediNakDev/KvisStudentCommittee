import { fireStoreDb, getNews } from "./firebase.js";
const newsDb = await getNews(fireStoreDb);

const docNews = document.getElementById("newsbox");
const docnewsshow = document.getElementById("newsshow");
const docnewsshow_background = document.getElementById("newsshow-background");

const renderNews = function () {
  let inner = "";
  for (let i = 0; i < newsDb.length; i++) {
    const element = newsDb[i];
    inner += `<div class="news">
    <button onclick="showNews(${i})">
      <h4 id="${i}" class="topic">${element.name}</h4>
    </button>
    <h4 class="date">${element.date[0]}/${element.date[1]}/${element.date[2]}</h4>
    </div>`;
  }
  docNews.innerHTML = inner;
};

window.showNews = function (i) {
  docnewsshow.style.display = "block";
  docnewsshow_background.style.display = "block";
  const element = newsDb[i];
  let inner =`<div class="space"></div>
  <div class="news-show">
  <h4 class="topic-show">${element.name}</h4>
  <h4 class="date-show">${element.date[0]}/${element.date[1]}/${element.date[2]}</h4>
  </div>
  <h6 class="content">${element.content}</h6>
  <div class="space"></div>`
  docnewsshow.innerHTML = inner;

};

window.hideNews = function (){
  docnewsshow.style.display = "none";
  docnewsshow_background.style.display = "none";
};

renderNews();