let loading = false;
let s = [];
let tamanho = '';
let searchString = '';
const searchBar = document.getElementById('search-bar');

async function loadtribes(force = false) {

    if (localStorage.getItem('db') === null || JSON.parse(localStorage.getItem('counter')) > 9 || force) {
        // não armazenou tribos no Storage
        loading = true;
        const res = await fetch('https://wiki.previa.app/api/search/?fl=name,imagem,localizacao,paragrafo,familiaLinguistica,slug,module,description&rows=999&sort=titleAlpha ASC');
        const tribos = await res.json();
        loading = false;
        s = tribos.docs;

        localStorage.setItem('db', JSON.stringify(s));
        localStorage.setItem('comunidades', JSON.stringify(s.filter(a => {
            return (a.module == "comunidade")
        })));
        localStorage.setItem('counter', 0);

    } else {
        s = JSON.parse(localStorage.getItem('db'));
        let counter = JSON.parse(localStorage.getItem('counter'));
        localStorage.setItem('counter', counter + 1);
    }

}
loadtribes();

searchBar.addEventListener('keyup', (e) => {
    var searchString = (e.target.value.toLowerCase());
    var buscafinal = searchString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    var filteredtribes = s.filter(valortribo => {
        if (valortribo.hasOwnProperty('name') && valortribo.name != '') {
            return (
                ((valortribo.hasOwnProperty('familiaLinguistica')) ? valortribo.familiaLinguistica.toLowerCase().includes(buscafinal) : false) ||
                ((valortribo.hasOwnProperty('localizacao')) ? valortribo.localizacao.toLowerCase().includes(buscafinal) : false) ||
                valortribo.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(buscafinal)
            );
        }

    });
    tamanho = filteredtribes.length;

    if (searchString != '' && tamanho != 0) {
        let test = `
            <div id="resultadosencontrados"></div>
            <div id="resultadobusca" class="container distanciamento"></div>`;
        var resul =
            `<h1>${e.target.value}</h1>
        <p>${tamanho} resultados encontrados</p>`
        let tpl = '';
        filteredtribes.forEach(tribo => {

            if (tribo.module == "comunidade") {
                tpl +=
                    `<div class="container distanciamento">
                 <h3><a href=./tribos.html?name=${tribo.slug}>${tribo.name}</a></h3><span class="badge rounded-pill bg-dark">${tribo.module}</span>
                 <span class="badge rounded-pill bg-primary">${tribo.localizacao}</span></br>
             ${tribo.paragrafo}
             </div>`
            } else {
                tpl +=
                    `<div class="container distanciamento">
                 <h3><a href=./tribos/index.html?name=${tribo.slug}>${tribo.name}</a></h3><span class="badge rounded-pill bg-danger">${tribo.module}</span></br>
             ${tribo.description}
             </div>`
            }
        });
        document.getElementById('test').innerHTML = test;
        document.getElementById('test').style.display = 'block';
        document.getElementById('busca').style.display = 'none';
        document.getElementById('main-image').style.display = 'none';
        document.getElementById('resultadosencontrados').innerHTML = resul;
        document.getElementById('resultadobusca').innerHTML = tpl;
    } else if (searchString == '') {
        let test = `<h1>Nada foi encontrado</h1>
            <div id="resultadosencontrados"></div>   
            <div id="resultadobusca" class="container distanciamento"></div>`
        document.getElementById('test').style.display = 'none';
        document.getElementById('test').innerHTML = test;
        document.getElementById('busca').style.display = 'block';
        document.getElementById('main-image').style.display = 'block';
    } else if (tamanho == 0) {
        let test = `<h1>Nada foi encontrado</h1>
            <div id="resultadosencontrados"></div>
            <div id="resultadobusca" class="container distanciamento"></div>`
        document.getElementById('test').innerHTML = test;
    }
});