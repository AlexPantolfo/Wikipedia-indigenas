import { db } from "./firebase.js";
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {

  let comunidades = JSON.parse(localStorage.getItem('Comunidades'));
  let form = document.getElementById('registrarOcorrencia');
  
//Populando select com as tribos
var select = document.getElementById('selectComunidades')

for (var i = 0; i<comunidades.length; i++){
  var opt = document.createElement('option');
  opt.innerHTML = comunidades[i].name;
  select.appendChild(opt);
}

  //preparando dados do fomulario para envio
  form.addEventListener('submit', (e) => { 
    e.preventDefault(); e.stopPropagation();
  
    let data = {
      autor: form['autor'].value,
      email: form['email'].value,
      module: 'ocorrencias',
      name: form['name'].value,
      description: form['description'].value,
      created: serverTimestamp()
    }

    //adicionando ocorrencia ao bd
    addDoc(collection(db, "Ocorrências"), data).then(alert("Ocorrência cadastrada")).then(form.reset())
  })


});