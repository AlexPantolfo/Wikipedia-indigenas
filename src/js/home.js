let init = () => {
    window.comunidades = JSON.parse(localStorage.getItem('Comunidades'));

    i18n = {
        "AC": "Acre",
        "AL": "Alagoas",
        "AP": "Amapá",
        "AM": "Amazonas",
        "BA": "Bahia",
        "CE": "Ceará",
        "DF": "Distrito Federal",
        "ES": "Espírito Santo",
        "GO": "Goiás",
        "MA": "Maranhão",
        "MT": "Mato Grosso",
        "MS": "Mato Grosso do Sul",
        "MG": "Minas Gerais",
        "PA": "Pará",
        "PB": "Paraíba",
        "PR": "Paraná",
        "PE": "Pernambuco",
        "PI": "Piauí",
        "RJ": "Rio de Janeiro",
        "RN": "Rio Grande do Norte",
        "RS": "Rio Grande do Sul",
        "RO": "Rondônia",
        "RR": "Roraima",
        "SC": "Santa Catarina",
        "SP": "São Paulo",
        "SE": "Sergipe",
        "TO": "Tocantins",
        "GF": "Guiana Francesa"
    }

    window.letras = {}
    window.familiaLinguistica = {}
    window.localidades = {}

    comunidades.forEach(a => {

        if (a.slug != undefined) {
            // fetch letras
            let l = a.slug.slice(0, 1).toUpperCase();
            if (!letras.hasOwnProperty(l)) {
                letras[l] = [];
            }
            letras[l].push(a);

            // fetch familiaLinguistica
            if (a.familiaLinguistica != '') {
                let f = a.familiaLinguistica;
                if (!familiaLinguistica.hasOwnProperty(f)) {
                    familiaLinguistica[f] = [];
                }
                familiaLinguistica[f].push(a);
            }

            // fetch localidade
            if (a.localizacao != '') {
                let g = a.localizacao;

                g.split(',').forEach(b => {
                    b = b.trim()

                    if (b.indexOf('Guiana Francesa') > 0) {
                        if (!localidades.hasOwnProperty('GF')) {
                            localidades.GF = [];
                        }
                        localidades.GF.push(a);
                        b = b.replace("Guiana Francesa", "").replace("  ", " ").trim();
                    }

                    b.split(" ").forEach(c => {
                        // console.log(c);
                        if (!i18n.hasOwnProperty(c)) {
                            // console.log(c);
                            if (!localidades.hasOwnProperty(c)) {
                                localidades[c] = [];
                            }
                            localidades[c].push(a);

                            b = b.replace(c, '').trim();
                        }
                    });

                    if (b.indexOf('/') > 0) {
                        b.split('/').forEach(d => {
                            if (!localidades.hasOwnProperty(d)) {
                                localidades[d] = [];
                            }
                            localidades[d].push(a);
                        })
                    }


                    // console.log(b);

                    if (b != "") {
                        if (!localidades.hasOwnProperty(b)) {
                            localidades[b] = [];
                        }
                        localidades[b].push(a);
                    }

                })
            }
            // update i18n
            i18n[a.slug] = a.name;
        }
    })
}



const Home = {
    init: () => {
        Home.cards();
        Home.ocorrencias();
    },

    ocorrencias: () => {
        let ocorrencias = JSON.parse(localStorage.getItem('Ocorrencias'));
        document.getElementById('ocorrenciasNumFound').innerText = ocorrencias.length;
        let ultimasOcorrencias = [];
        function get3ocorrencias(arr) {
             for (var i = 0; i < 3; i++) {
               ultimasOcorrencias.push(arr[i]); 
            }
            return ultimasOcorrencias
          }
     ultimasOcorrencias = get3ocorrencias(ocorrencias);
            let tpl = '<table>';

                ultimasOcorrencias.forEach(a => {
                    if (a.name != '' && a.name != 'undefined') {

                        let description = a.description;
                        if (description.length > 50) {
                            description = description.slice(0, 50) + '...';
                        }

                        tpl +=
                            `<tr>
                <td style="padding-right:1rem">${a.name}</td>
                <td>${description}</td>
              </tr>`
                    }
                })
                tpl += `</table>`

                document.getElementById('ocorrenciasLast').innerHTML = tpl;


            
    },

    cards: () => {
        let randomCard1 = comunidades[Math.floor(Math.random() * comunidades.length)];
        let randomCard2 = comunidades[Math.floor(Math.random() * comunidades.length)];
        let randomCard3 = comunidades[Math.floor(Math.random() * comunidades.length)];

        while (randomCard1 == randomCard2 || randomCard2 == randomCard3 || randomCard1 == randomCard3 || randomCard1.imagem == '' || randomCard1.paragrafo == '' || randomCard2.imagem == '' || randomCard2.paragrafo == '' || randomCard3.imagem == '' || randomCard3.paragrafo == '') {
            randomCard1 = comunidades[Math.floor(Math.random() * comunidades.length)];
            randomCard2 = comunidades[Math.floor(Math.random() * comunidades.length)];
            randomCard3 = comunidades[Math.floor(Math.random() * comunidades.length)];
        }

        const card1 =
            `<a href="./tribos.html?name=${randomCard1.slug}">
         <div class="card">
           <img class="card-img-top" src="${randomCard1.imagem}">
           <div class="card-body">
               <h5 class="card-title text-center">${randomCard1.name}</h5>
               <p class="card-text">${randomCard1.paragrafo}</p>
           </div>
         </div>
         </a>`
        document.getElementById('card1').innerHTML = card1;

        const card2 = `<a href=./tribos.html?name=${randomCard2.slug}>
    <div class="card">
      <img class="card-img-top" src="${randomCard2.imagem}">
      <div class="card-body">
          <h5 class="card-title text-center">${randomCard2.name}</h5>
          <p class="card-text">${randomCard2.paragrafo}</p>
      </div>
    </div>
    </a>`
        document.getElementById('card2').innerHTML = card2;

        const card3 = `<a href=./tribos.html?name=${randomCard3.slug}>
    <div class="card">
    <img class="card-img-top" src="${randomCard3.imagem}">
    <div class="card-body">
        <h5 class="card-title text-center">${randomCard3.name}</h5>
        <p class="card-text">${randomCard3.paragrafo}</p>
    </div>
    </div>
    </a>`
        document.getElementById('card3').innerHTML = card3;
    }


}


const Indice = {

    DOM: {
        content: document.getElementById('tribos'),
        buttons: document.querySelectorAll('#encontre .btn-group > button')
    },

    init: () => {
        Indice.nome();
        Indice.listen();
    },

    listen: () => {
        Indice.DOM.buttons.forEach(a => {
            a.addEventListener('click', function(e) {
                let method = this.getAttribute('id');
                Indice[method]();
            }, false);
        })
    },

    nome: () => {
        let tpl = '';

        Object.keys(letras).sort().forEach(l => {
            tpl +=
                `<div class="letra">
          <h2>${l}</h2>`;

            letras[l].sort((a, b) => (a.name > b.name) ? 1 : -1).forEach(a => {
                tpl +=
                    `<nav>
          <a href="./tribos.html?name=${a.slug}">${a.name}</a>
        </nav>`
            })

            tpl += `</div>`;

        });

        Indice.DOM.content.innerHTML = tpl;
    },

    familiaLinguistica: () => {
        let tpl = '';

        Object.keys(familiaLinguistica).sort().forEach(l => {
            tpl +=
                `<div class="letra">
          <h2 class="familia">${l}</h2>`;

            familiaLinguistica[l].sort((a, b) => (a.name > b.name) ? 1 : -1).forEach(a => {
                tpl +=
                    `<nav>
          <a href="./tribos.html?name=${a.slug}">${a.name}</a>
        </nav>`
            })

            tpl += `</div>`;

        });

        Indice.DOM.content.innerHTML = tpl;
    },

    localidade: () => {
        let tpl = '';

        Object.keys(localidades).sort().forEach(l => {

            let label = (i18n.hasOwnProperty(l)) ? i18n[l] : l;

            tpl +=
                `<div class="letra">
          <h2 class="familia">${label}</h2>`;

            localidades[l].sort((a, b) => (a.name > b.name) ? 1 : -1).forEach(a => {
                tpl +=
                    `<nav>
          <a href="./tribos.html?name=${a.slug}">${a.name}</a>
        </nav>`
            })

            tpl += `</div>`;

        });

        Indice.DOM.content.innerHTML = tpl;
    }
}

let interval = setInterval(() => {
    if (!loading) {
        init();
        Home.init();
        Indice.init();

        clearInterval(interval);
    }
}, 200)

document.addEventListener('DOMContentLoaded', () => {

});