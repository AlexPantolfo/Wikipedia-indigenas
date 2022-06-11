const _date = a => {
  let Y = a.slice(0,4);
  let m = a.slice(5,7);  
  let d = a.slice(8,10); 

  let H = a.slice(11,13);
  let i = a.slice(14,16);

  return `${d}/${m}/${Y} às ${H}h${i}`;
}


let ocorrencias = () => {
  let ocorrencias = JSON.parse(localStorage.getItem('Ocorrencias'));
      let tinqs = '';

      ocorrencias.forEach(a => {
          if(a.hasOwnProperty('sortDate')) {
            tinqs += `<p class="dataHora">${_date(a.sortDate)}</p>
            <p class="tribo">${a.name}</p>
            <p class="fatos">${a.description}</p>`
          } else {
            let time = a.created;
            const fireBaseTime = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
            const date = fireBaseTime.toDateString();
            const atTime = fireBaseTime.toLocaleTimeString();
        tinqs += `<p class="dataHora">${date} às ${atTime}</p>
        <p class="tribo">${a.name}</p>
        <p class="fatos">${a.description}</p>`
      }
    });
      document.getElementById('dadosOcorrencia').innerHTML += tinqs;
}

ocorrencias();