document.addEventListener('DOMContentLoaded', () => {

    let comunidades = JSON.parse(localStorage.getItem('Comunidades'));
    const tribo = (new URL(location.href)).searchParams.get("name");

    function getByValue(arr, value) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].slug == value) return arr[i];
        }
      }

let info = getByValue(comunidades, tribo);
document.getElementById('tituloTribo').innerHTML = info['name'];
document.getElementById('nomeTribo').innerHTML = info['name'];
document.getElementById('paragrafo').innerHTML = info['paragrafo'];
document.getElementById('autodenominacao').innerHTML = info['autodenominacao'];
document.getElementById('localizacao').innerHTML = info['localizacao'];
document.getElementById('populacao').innerHTML = info['populacao'];
document.getElementById('familiaLinguistica').innerHTML = info['familiaLinguistica'];
document.getElementById('main-image').style.backgroundImage = `url('${info.imagem}')`;
document.getElementsByTagName('title')[0].innerText = `${info['name']} - Wiki Indígenas`
if (info.hasOwnProperty('link') && info.link != '') {
    document.getElementById('readMore').innerHTML =
        `<a id="readMore" href="${info.link}" target="_blank">Leia mais...</a>`
}
document.querySelector('a[name="contato"]')
    .setAttribute('href', `contato-com-a-comunidade.html?name=${info.slug}`);
document.querySelector('a[name="cadastre-se"]')
    .setAttribute('href', `cadastre-se-como-contato.html?name=${info.slug}`);
if (info.hasOwnProperty('nomes')) {
    let autor = "";
    info.nomes.forEach((v, k) => {
        if (k > 0) {
            autor += "<br /> e ";
        } else {
            if (v.length > 0) {
                autor += "Por: ";
            }
        }
        autor += v;
        if (info.hasOwnProperty('cargos')) {
            if (info.cargos[k] != '') {
                autor += `<br />${info.cargos[k]}`
            }
        }
    })
    document.getElementById('autor').innerHTML = autor;
    document.getElementById('original').innerHTML = `<a href=${info.link}>ver original <i class="fas fa-external-link-alt"></i></a>`;
}
})