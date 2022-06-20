import { db } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

let form = document.getElementById('cadastreComunidade');

form.addEventListener('submit', (e) => { 
  e.preventDefault(); e.stopPropagation();

  let data = {
    autor: form['autor'].value,
    email: form['email'].value,
    familiaLinguistica: form['familiaLinguistica'].value,
    localizacao: form['localizacao'].value,
    module: 'comunidade',
    name: form['name'].value,
    paragrafo: form['paragrafo'].value,
    populacao: form['populacao'].value,
    slug: form['name'].value.toLowerCase()
  }
  
  addDoc(collection(db, "Comunidades"), data).then(alert("Comunidade cadastrada"))
})