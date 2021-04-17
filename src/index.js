import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyAEPK3cP_xYfjO97gxyhQK8brD-AjMVoro",
  authDomain: "to-do-app-5a4a4.firebaseapp.com",
  projectId: "to-do-app-5a4a4",
  storageBucket: "to-do-app-5a4a4.appspot.com",
  messagingSenderId: "915202244743",
  appId: "1:915202244743:web:07ef4b5c59922034b97822",
});

export const db = firebase.firestore();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
