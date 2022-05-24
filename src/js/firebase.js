import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, getDocs, collection, query } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJRzV3oZUSRiy4tIRxPHZAIy76p8zEHEg",
  authDomain: "wiki-indigena.firebaseapp.com",
  projectId: "wiki-indigena",
  storageBucket: "wiki-indigena.appspot.com",
  messagingSenderId: "741530916934",
  appId: "1:741530916934:web:c3c24fa5050745caecd247"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// let comunidades = [];
// let contato = [];
// let contatoComunidades = [];
// let ocorrencias = [];

// async function Comunidades() {
//   const q = query(collection(db, "Comunidades"));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   comunidades.push(doc.data())
// });
// localStorage.setItem('Comunidades', JSON.stringify(comunidades))
// }
// async function Contato() {
//   const q = query(collection(db, "Contato"));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   contato.push(doc.data())
// });
// localStorage.setItem('Contato', JSON.stringify(contato))
// }
// async function ContatoComunidades() {
//   const q = query(collection(db, "Contato-Comunidade"));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   contatoComunidades.push(doc.data())
// });
// localStorage.setItem('ContatoComunidades', JSON.stringify(contatoComunidades))
// }
// async function Ocorrencias() {
//   const q = query(collection(db, "Ocorrências"));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   ocorrencias.push(doc.data())
// });
// localStorage.setItem('Ocorrencias', JSON.stringify(ocorrencias))
// }

// Comunidades();
// Contato();
// ContatoComunidades();
// Ocorrencias();