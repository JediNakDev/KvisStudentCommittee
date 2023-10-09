import { initializeApp } from "firebase";
import { getFirestore, getDocs, addDoc, Timestamp, collection } from "firestore";
import { Event, News, Comment } from "./dataClass.js";

const firebaseConfig = {
  apiKey: "AIzaSyApurdM44XLhMp8DeSWKns2rbYEzsKer6M",
  authDomain: "kvisssc-app.firebaseapp.com",
  projectId: "kvisssc-app",
  storageBucket: "kvisssc-app.appspot.com",
  messagingSenderId: "676099747265",
  appId: "1:676099747265:web:8f957586d76d456998d340",
  measurementId: "G-TPK98HT3DS",
};

const app = initializeApp(firebaseConfig);
const fireStoreDb = getFirestore(app);

async function getEvents(fireStoreDb) {
  const eventDb = [];
  const querySnapshot = await getDocs(collection(fireStoreDb, "eventdata"));
  querySnapshot.forEach((doc) => {
    eventDb.push(
      new Event(
        doc.id,
        doc.data()["details"],
        doc.data()["start"],
        doc.data()["end"]
      )
    );
  });
  console.log("get events");

  return eventDb;
}

async function getNews(fireStoreDb) {
  const newsDb = [];
  const querySnapshot = await getDocs(collection(fireStoreDb, "newsdata"));
  querySnapshot.forEach((doc) => {
    newsDb.push(
      new News(
        doc.id,
        doc.data()["content"],
        doc.data()["author"],
        doc.data()["date"]
      )
    );
  });
  console.log("get news");

  return newsDb;
}

async function collectComment(fireStoreDb,comment) {
  if (comment != ''){
    await addDoc(collection(fireStoreDb, "commentBox"), {
    comment: comment,
    time: Timestamp.now()
  });
  }
}

async function getComments(fireStoreDb) {
  const commentsDb = [];
  const querySnapshot = await getDocs(collection(fireStoreDb, "commentBox"));
  querySnapshot.forEach((doc) => {
    commentsDb.push(
      new Comment(
        doc.data()["time"]["seconds"],
        doc.data()["comment"],
      )
    );
  });
  console.log("get comments");

  return commentsDb;
}

export { fireStoreDb, getEvents, getNews, collectComment, getComments };
