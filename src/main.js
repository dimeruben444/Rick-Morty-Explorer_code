import "./sass/style.scss";


let arrPersonajes = [];

let app = document.querySelector("#app");

function mostrarPersonajes(arrPersonajes) {
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

function scrollUp(){
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    }); 
}



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
      
      mostrarPersonajes(arrPersonajes);
      actualizarPagInfo()
      paginationImposible()

      scrollUp()
       
    });
};



cargarPersonajes(1);

//PAGINATION



const pagInfo =  document.getElementById('paginfo')

function actualizarPagInfo(){
    pagInfo.innerHTML=`Página ${paginaActual} de ${totalPaginas}`
    
}

function paginaSiguiente(){
    if(paginaActual < totalPaginas){
        cargarPersonajes(paginaActual + 1)  
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

function desabilitarPagination (button){
    buttonSiguiente.disabled = true
    buttonAnterior.disabled = true
}

function habilitarPagination (button){
    buttonSiguiente.disabled = false
    buttonAnterior.disabled = false
}
function paginationImposible(){
    if (paginaActual === 1){
        buttonAnterior.disabled = true
    }else{
        buttonAnterior.disabled = false
    }

    if (paginaActual === totalPaginas){
            buttonSiguiente.disabled = true
      }else{
            buttonSiguiente.disabled = false
      }

}



//BUSCADOR FILTRO

async function cargarTodosLosPersonajes() { 
    let url = "https://rickandmortyapi.com/api/character"; 
    let data = await fetch(url).then(r => r.json());// Guardamos los primeros resultados 
    let todos = [...data.results];// Total de páginas 

    let totalPaginas = data.info.pages; // Cargar el resto de páginas 

    for (let i = 2; i <= totalPaginas; i++) { 
        let pageData = await fetch(`${url}?page=${i}`)
        .then(r => r.json()); 
        todos = [...todos, ...pageData.results]; 
    } 
    return todos; 
}

let todosLosPersonajes = []; 

(async () => {
     todosLosPersonajes = await cargarTodosLosPersonajes(); console.log("Total personajes cargados:",todosLosPersonajes.length); 
})();




let search = document.getElementById('search')
search.addEventListener('input', (e)=>{
    const busqueda = e.target.value.toLowerCase();
    console.log('Buscando:', busqueda);
    
    if (busqueda === "") { 
        app.innerHTML = ""; 
        cargarPersonajes(paginaActual); 
        habilitarPagination()
        return; 
    }

    // Filtrar personajes
    const filtrados = todosLosPersonajes.filter(personaje => {
        return personaje.name.toLowerCase().includes(busqueda);
    });

    app.innerHTML = "";

    if (filtrados.length === 0) { 
        app.innerHTML = ` <div class="no-results"> <p>No se encontraron personajes con ese nombre...</p> </div> `; return; 
    }

    mostrarPersonajes(filtrados);
    desabilitarPagination()
});

let filtro = document.getElementById('filtro')

filtro.addEventListener('input', (e)=>{
    const filtro = e.target.value.toLowerCase();
    console.log('Buscando:', filtro);
    
    if (filtro === "") { 
        app.innerHTML = ""; 
        cargarPersonajes(paginaActual); 
        habilitarPagination()
        return; 
    }

    // Filtrar personajes
    const filtrados = todosLosPersonajes.filter(personaje => {
        return personaje.status.toLowerCase().includes(filtro);
    });

    app.innerHTML = "";

    if (filtrados.length === 0) { 
        app.innerHTML = ` <div class="no-results"> <p>No se encontraron personajes con ese nombre...</p> </div> `; return; 
    }

    mostrarPersonajes(filtrados);
    desabilitarPagination()
});



