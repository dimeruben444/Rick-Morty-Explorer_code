import "./sass/style.scss";

let urlApi = "https://rickandmortyapi.com/api/character";

let arrPersonajes = [];
/* 
fetch(urlApi)
    .then((response)=> response.json())
    .then(data => {
        arrPersonajes = data.results
        mostrarpersonajes(arrPersonajes)
})
 
 */
let app = document.querySelector("#app");

function mostrarpersonajes(arrPersonajes) {
  arrPersonajes.forEach((personaje) => {
    let newCard = document.createElement("div");
    newCard.innerHTML = `
                <div class="img-container">
                    <img src= "${personaje.image}" alt="">
                    <button class="status ${personaje.status} ">${personaje.status}</button>
                </div>
                <div class="info-container">
                    <h3 class="character-name">${personaje.name}</h3>
                    <p class="character-specie">${personaje.gender} - ${personaje.species}</p>
                    <p class="character-location"><span>📍</span> ${personaje.location.name} </p>
                </div>
        `;
    newCard.classList.add("card");
    app.appendChild(newCard);
  });
}

let pagination = document.querySelector("#pagination");

let paginaActual = 1;
let totalPaginas = 1;



const cargarPersonajes = async (numeroPagina) => {
  document.getElementById("app").innerHTML = "<p>Cargando...</p>";

  let urlApi = `https://rickandmortyapi.com/api/character/?page=${numeroPagina}`;

  await fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {

      arrPersonajes = data.results;
      paginaActual = numeroPagina;
      totalPaginas = data.info.pages;
      

      document.getElementById("app").innerHTML = "";
      
      mostrarpersonajes(arrPersonajes);
    });
};

cargarPersonajes();

console.log(totalPaginas)
function paginaSiguiente(){
    if(paginaActual < totalPaginas){
        cargarPersonajes(paginaActual + 1)
        console.log('sigiente')
    }

}


function paginaAnterior(){
    if(paginaActual > 1 ){
        cargarPersonajes(paginaActual - 1)
    }
    
}

const buttonSiguiente= document.getElementById('siguiente')
const buttonAnterior= document.getElementById('anterior')

buttonSiguiente.addEventListener('click',(e)=>{
    e.preventDefault()
    
    paginaSiguiente()
   
})

buttonAnterior.addEventListener('click',(e)=>{
    e.preventDefault()
    paginaAnterior()
})