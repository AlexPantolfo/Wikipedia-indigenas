import Form from './Form.js'
import bsModal from './bsModal.js'
import toElement from './toElement.js'

document.addEventListener('DOMContentLoaded', () => {

  const tribo = (new URL(location.href)).searchParams.get("name");
  // document.getElementById('name').value = tribo;
  // populando o <select> com os nomes das tribos
  fetch(`https://wiki.previa.app/api/search/?q=slug:${tribo}&rows=1&fl=imagem,name`)
    .then(r => r.json())
    .then(r => {
      if(r.numFound > 0){
        let tribo = r.docs[0];  
        document.getElementById('main-image').style.backgroundImage = `url('${tribo.imagem}')`;
        document.getElementById('nome-da-tribo').innerText = tribo.name;
      }
      
    })


  // populando o <select> com os nomes das tribos
  fetch('https://wiki.previa.app/api/search/?fl=name,slug&rows=500&sort=titleAlpha+ASC')
    .then(r => r.json())
    .then(r => {

      r.docs.forEach(item => {

        let selected = "";
        if(item.slug == tribo){
          selected = ' selected="selected"'
        }

        if(item.hasOwnProperty('name')){
          document.querySelector('select[name="name"]')
            .append(toElement(
              
              `<option value="${item.slug}"${selected}>${item.name}</option>`
            ))  
        }
      })

    })

  
  let form = document.getElementById('cadastreSe');

  form.addEventListener('submit', (e) => { 
  
    e.preventDefault(); e.stopPropagation();
    let data = {
      data: Form.data(form) 
    }

    fetch('https://wiki.previa.app/api/wiki/contato/create', {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json' 
      },
      body: JSON.stringify(data) 
    }).then(r => r.json()) 
      .then(r => { 

        let id = 'modalContatoComunidade'; 

        let Modal = new bsModal({
          id: id,
          title: 'Contato com a comunidade',
          message: r.message
        })

        Modal.render(document.getElementsByTagName('body')[0]);
        
        (new bootstrap.Modal(document.getElementById(id), {})).show();

      })

  })


});