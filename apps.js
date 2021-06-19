const TMDB_ENDPOINT = 'https://api.themoviedb.org/3';
const APIKEY = '46dbd9e2140996af5b47c9a91976c0c4';
const IMG_PREFIX = 'https://image.tmdb.org/t/p/w500';
let xhr;
let pagina = 1;
let totalpagina;

function carregaFilmes () {
    xhr = new XMLHttpRequest ();
    
    if (pagina == 1 || pagina <= totalpagina){
        xhr.open ('GET', TMDB_ENDPOINT + '/movie/popular' + '?api_key=' + APIKEY  + '&language=pt-BR&page=' + pagina, true);
        xhr.onload = exibeFilmes;
        xhr.send();
        pagina++;
    }
}

function pesquisaFilmes () {
    xhr = new XMLHttpRequest ();

    query = document.getElementById('pesquisa').value;

    xhr.open ('GET', TMDB_ENDPOINT + '/search/movie' + '?api_key=' + APIKEY + '&query=' + query, true);
    xhr.onload = exibeFilmesPesquisa;
    xhr.send();
}

function exibeFilmesPesquisa () {
    
    let data = JSON.parse (xhr.responseText);
    let textoHTML = '';

    for (let i = 0; i < data.results.length; i++) {
        let nomeFilme = data.results[i].title;
        let sinopse = data.results[i].overview;
        let imagem = IMG_PREFIX + data.results[i].poster_path;

        textoHTML += `<div class="card col-md-2">
            <img src="${imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${nomeFilme}</h5>
                <p class="card-text">${sinopse}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>`
    }

    document.getElementById('tela').innerHTML = textoHTML;
}


function exibeFilmes () {
    
    let data = JSON.parse (xhr.responseText);
    let textoHTML = '';
    totalpagina = data.total_pages;

    for (let i = 0; i < data.results.length; i++) {
        let nomeFilme = data.results[i].title;
        let sinopse = data.results[i].overview;
        let imagem = IMG_PREFIX + data.results[i].poster_path;
        let id = data.results[i].id;

        textoHTML += `<div class="card col-md-2">
            <img src="${imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${nomeFilme}</h5>
                <p class="card-text">${sinopse}</p>
                <a href="https://www.themoviedb.org/movie/${id}" class="btn btn-dark">Saiba mais</a>
            </div>
        </div>`
    }

    document.getElementById('tela').innerHTML += textoHTML;
}