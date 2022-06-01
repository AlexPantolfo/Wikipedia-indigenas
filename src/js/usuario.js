import { db } from "./firebase.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const auth = getAuth();
let location = window.location.pathname;

//Seeing whether the user is signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
    let nav = '';
    nav +=  `<li class="nav-item"><a class="nav-link header-titulo " href="./cadastre-sua-comunidade.html">Cadastre sua comunidade</a></li>
    <li class="nav-item"><a class="nav-link header-titulo" href="./ocorrencias.html">Ocorrências</a></li>
    <li class="nav-item"><a class="nav-link header-titulo" href="./registrar-ocorrencia.html">Registre sua ocorrência</a></li>
    <li class="nav-item"><a id="logout" class="nav-link header-titulo" href="#">Logout</a></li>`
    
    document.getElementById('itensnav').innerHTML = nav;

    const logout = document.querySelector('#logout');
    logout.addEventListener('click', (e) => {
      e.preventDefault();
      signOut(auth);
    });
  } else {
    let nav = '';
    nav +=  `<li class="nav-item"><a class="nav-link header-titulo " href="./cadastre-sua-comunidade.html">Cadastre sua comunidade</a></li>
    <li class="nav-item"><a class="nav-link header-titulo" href="./ocorrencias.html">Ocorrências</a></li>
    <li class="nav-item"><a class="nav-link header-titulo" href="./registrar-ocorrencia.html">Registre sua ocorrência</a></li>
    <li class="nav-item"><a class="nav-link header-titulo" href="./cadastro.html">Registrar</a></li>
    <li class="nav-item"><a class="nav-link header-titulo" href="./login.html">Login</a></li>`
    
    document.getElementById('itensnav').innerHTML = nav;
  }
});

if (location.includes('cadastro') || location.includes('login')) {
  if (location.includes('cadastro')) {
    // signup
    const signupForm = document.querySelector('#cadastreSe');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // gettting user info
    const email = signupForm['email'].value;
    const password = signupForm['senha'].value;
  
    let data = {
      Email: signupForm['email'].value,
      CPF: signupForm['cpf'].value,
      telefone: signupForm['telefone'].value,
      usuario: signupForm['autor'].value
  };
     createUserWithEmailAndPassword(auth, email, password).then(cred => {
           try {
            setDoc(doc(db, "Users", cred.user.uid), data);
            alert("Usuário criado")
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            });
      });
    } else {
    // Login
  const loginForm = document.querySelector('#LoginForm');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['email'].value;
    const password = loginForm['senha'].value;
    signInWithEmailAndPassword(auth, email, password).then(cred => {
      window.location = 'index.html';
    })
  })
  }
}