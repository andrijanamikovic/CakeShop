import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAf0fv7hTcEKkf7Vh9GmAq5MLI4GBEhOUo",
  authDomain: "cakeshop-1641c.firebaseapp.com",
  databaseURL:
    "https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "cakeshop-1641c",
  storageBucket: "cakeshop-1641c.appspot.com",
  messagingSenderId: "1008975450102",
  appId: "1:1008975450102:web:257e54840f02accb4901d7",
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
