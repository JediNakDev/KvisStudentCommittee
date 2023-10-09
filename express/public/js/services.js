import { fireStoreDb, collectComment, getComments } from "./firebase.js";

const docForm = document.getElementById("left");
const doccommentsshow = document.getElementById("commentsshow");
const doccommentsshow_background = document.getElementById("commentsshow-background");

docForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(docForm);
    const comment = formData.get('comment');
    console.log('comment: ',comment)

    await collectComment(fireStoreDb,comment)

    docForm.reset();
  });

const commentsDb = await getComments(fireStoreDb);
commentsDb.sort(function(a, b){return b['time'] - a['time']});

window.showComments = function(){
    doccommentsshow.style.display = "block";
  doccommentsshow_background.style.display = "block";
}

window.hideComments = function(){
    doccommentsshow.style.display = "none";
  doccommentsshow_background.style.display = "none";
}