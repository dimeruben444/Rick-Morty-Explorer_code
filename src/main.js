import "./sass/style.scss";

let app = document.querySelector("#app");

//Header

let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) {
    // Scroll hacia abajo → ocultar
    header.classList.add("hidden");
  } else {
    // Scroll hacia arriba → mostrar
    header.classList.remove("hidden");
  }
  lastScroll = currentScroll;
});

//render personajes
let arrPersonajes = [];

function mostrarPersonajes(arrPersonajes) {
  app.innerHTML = "";

  arrPersonajes.forEach((personaje) => {
    let newCard = document.createElement("div");
    newCard.innerHTML = `
        <div class="id " id="${personaje.id}" ></div>
        <div class="img-container">
            <img src= "${personaje.image}" alt="">
            <button class="status ${personaje.status} ">${personaje.status}</button>

            <button class="favorite-btn " >🤍</button>
           
        </div>
        <div class="info-container">
            <h3 class="character-name">${personaje.name}</h3>
            <p class="character-specie">${personaje.gender} - ${personaje.species}</p>
            <p class="character-location"><span>📍</span> ${personaje.location.name} </p>
        </div>
    `;

    newCard.addEventListener("click", (e) => {
      console.log("abriendo overlay");
      abrirOverlay(personaje);
    });

    const favBtn = newCard.querySelector(".favorite-btn");

    favBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      guardarFav(e);
    });

    newCard.classList.add("card");
    app.appendChild(newCard);
  });
}

let totalFav = Number();
let arrFav = [];

function actualizarLocalStorage(arrFav) {
  
  localStorage.setItem("arrayFavId", JSON.stringify(arrFav));
}

function guardarFav(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    e.target.innerHTML = "❤️";

    console.log("activado");
    let cardId = e.target
      .closest(".card")
      .querySelector(".id")
      .getAttribute("id");

    arrFav.push(cardId); //guarda los id de la carta en el arrFav
    console.log(arrFav);

    actualizarLocalStorage(arrFav);

    const countFav = document.getElementById("count-fav");
    totalFav++;

    countFav.textContent = totalFav;

    if (countFav.textContent != 0) {
      countFav.style.display = "inline-block";
    } else {
      countFav.style.display = "none";
    }
  } else if (e.target.classList.contains("active")) {
    e.target.classList.remove("active");
    e.target.innerHTML = "🤍";
    console.log("desactivado");

    let cardId = e.target
      .closest(".card")
      .querySelector(".id")
      .getAttribute("id");

    const countFav = document.getElementById("count-fav");
    totalFav--;

    countFav.textContent = totalFav;

    var indice = arrFav.indexOf(cardId); //guearda el indice del id de la carta a borrar
    arrFav.splice(indice, 1); //borra el indice de dicho id
    console.log(arrFav);

    actualizarLocalStorage(arrFav);

    if (countFav.textContent != 0) {
      countFav.style.display = "inline-block";
    } else {
      countFav.style.display = "none";
    }
  }
}

function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function abrirOverlay(personaje) {
  let overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";

  console.log(personaje.episode);

  overlay.innerHTML = ` 

       <div class="overlay-container">
            <div class="overlay-img-container"> 
                <button id="close-overlay">X</button> 
                <img src="${personaje.image}" alt=""> 
            </div> 
            <section class="detail-info-container"> 
                <article> 
                    <h3 class="character-name">${personaje.name}</h3> 
                    <h4 class="info-tittle">Información</h4> 
                    <div class="informacion"> 
                        <div> 
                            <h5>ESTADO</h5> 
                            <p>${personaje.status}</p> 
                        </div> 
                        <div> 
                            <h5>ESPECIE</h5> 
                            <p>${personaje.species}</p> 
                        </div> 
                        <div> 
                            <h5>GÉNERO</h5> 
                            <p>${personaje.gender}</p> 
                        </div> 
                        <div> 
                            <h5>ORIGEN</h5> 
                            <p>${personaje.origin.name}</p> 
                        </div> 
                        <div> 
                            <h5>UBICACIÓN</h5> 
                            <p>${personaje.location.name}</p> 
                        </div> 
                    </div> 
                </article> 
                <article class="episodes"> 
                    <h4>Apariciones (${personaje.episode.length})</h4> 
                </article> 
            </section> 
        </div> 
    `;

  let close = document.getElementById("close-overlay");

  close.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.style.display = "none";
    document.body.style.overflow = "scroll";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      e.target.style.display = "none";
      document.body.style.overflow = "auto";
    }
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
      actualizarPagInfo();
      paginationImposible();

      scrollUp();
    });
};

cargarPersonajes(1);

// Episodios

let arrEpisodios = [];

function mostrarEpisodios(arrEpisodios) {
  app.innerHTML = "";
  arrEpisodios.forEach((episodio) => {
    let newEp = document.createElement("div");
    newEp.innerHTML = `
        <div class="ep-container">
            <p class="ep">Episodio</p>
            <p class="episode">${episodio.episode}</p>
            
            <h3 class="ep-name">${episodio.name}</h3> 
            <p class="estreno">Estreno<p class="ep-air">${episodio.air_date}</p></p>
            
            
        </div>
    `;

   

    newEp.classList.add("ep");
    app.appendChild(newEp);
  });
}

const cargarEpisodios = async (numeroPagina) => {
  document.getElementById("app").innerHTML = "<p>Cargando...</p>";

  let urlApi = `https://rickandmortyapi.com/api/episode/?page=${numeroPagina}`;

  await fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {
      arrEpisodios = data.results;
      paginaActual = numeroPagina;
      totalPaginas = data.info.pages;

      document.getElementById("app").innerHTML = "";

      mostrarEpisodios(arrEpisodios);
      actualizarPagInfo();
      paginationImposible();

      scrollUp();
    });
};

//FAVORITOS

let arrPersonajesFav = [];

function mostrarFavoritos(arrPersonajesFav) {
  app.innerHTML = "";

  arrPersonajesFav.forEach((personaje) => {
    let newCard = document.createElement("div");
    newCard.innerHTML = `
        <div class="id " id="${personaje.id}" ></div>
        <div class="img-container">
            <img src= "${personaje.image}" alt="">
            <button class="status ${personaje.status} ">${personaje.status}</button>

            <button class="favorite-btn " >🤍</button>
           
        </div>
        <div class="info-container">
            <h3 class="character-name">${personaje.name}</h3>
            <p class="character-specie">${personaje.gender} - ${personaje.species}</p>
            <p class="character-location"><span>📍</span> ${personaje.location.name} </p>
        </div>
    `;

    newCard.addEventListener("click", (e) => {
      console.log("abriendo overlay");
      abrirOverlay(personaje);
    });

    const favBtn = newCard.querySelector(".favorite-btn");

    favBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      guardarFav(e);
    });

    newCard.classList.add("card");
    app.appendChild(newCard);
  });
}

const cargarPersonajesFav = async () => {
  document.getElementById("app").innerHTML = "<p>Cargando...</p>";
    
  

  let urlApi = `https://rickandmortyapi.com/api/character/${localStorage.getItem('arrayFavId')}`;

  await fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {
      arrPersonajesFav = Array.isArray(data) ? data : [data];

      document.getElementById("app").innerHTML = "";

      mostrarFavoritos(arrPersonajesFav);
      actualizarPagInfo();
      paginationImposible();

      scrollUp();
    });
};











// Botones personajes episodios favoritos

const btnEp = document.getElementById("btn-ep");
const btnCh = document.getElementById("btn-ch");
const btnFav = document.getElementById("btn-fav");

btnEp.addEventListener("click", (e) => {
  e.preventDefault();
  btnCh.classList.remove("active");
   btnFav.classList.remove("active");
  btnEp.classList.add("active");
  document.getElementById("explorer").style.display = "none";
  cargarEpisodios(1);
});

btnCh.addEventListener("click", (e) => {
  e.preventDefault();
  btnEp.classList.remove("active");
   btnFav.classList.remove("active");
  btnCh.classList.add("active");
  document.getElementById("explorer").style.display = "inherit";
  cargarPersonajes(1);
});

btnFav.addEventListener("click", (e) => {
  e.preventDefault();
  btnCh.classList.remove("active");
  btnEp.classList.remove("active");
  btnFav.classList.add("active");

  document.getElementById("explorer").style.display = "inherit";
  cargarPersonajesFav(localStorage.getItem('arrayFavId'));
});



//PAGINATION

const pagInfo = document.getElementById("paginfo");

function actualizarPagInfo() {
  pagInfo.innerHTML = `Página ${paginaActual} de ${totalPaginas}`;
}

function paginaSiguiente() {
  if (btnCh.classList.contains("active")) {
    if (paginaActual < totalPaginas) {
      cargarPersonajes(paginaActual + 1);
    }
  }
  if (btnEp.classList.contains("active")) {
    if (paginaActual < totalPaginas) {
      cargarEpisodios(paginaActual + 1);
    }
  }
}

function paginaAnterior() {
  if (btnCh.classList.contains("active")) {
    if (paginaActual > 1) {
      cargarPersonajes(paginaActual - 1);
    }
  }

  if (btnEp.classList.contains("active")) {
    if (paginaActual > 1) {
      cargarEpisodios(paginaActual - 1);
    }
  }
}

const buttonSiguiente = document.getElementById("siguiente");
const buttonAnterior = document.getElementById("anterior");

buttonSiguiente.addEventListener("click", (e) => {
  e.preventDefault();
  paginaSiguiente();
});

buttonAnterior.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("anterior");
  paginaAnterior();
});

function desabilitarPagination() {
  buttonSiguiente.disabled = true;
  buttonAnterior.disabled = true;
}

function habilitarPagination() {
  buttonSiguiente.disabled = false;
  buttonAnterior.disabled = false;
}

function paginationImposible() {
  if (paginaActual === 1) {
    buttonAnterior.disabled = true;
  } else {
    buttonAnterior.disabled = false;
  }

  if (paginaActual === totalPaginas) {
    buttonSiguiente.disabled = true;
  } else {
    buttonSiguiente.disabled = false;
  }
}

//BUSCADOR FILTRO

async function cargarTodosLosPersonajes() {
  let url = "https://rickandmortyapi.com/api/character";
  let data = await fetch(url).then((r) => r.json());

  // Guardamos los primeros resultados
  let todos = [...data.results];

  // Total de páginas
  let totalPaginas = data.info.pages;

  // Cargar el resto de páginas
  for (let i = 2; i <= totalPaginas; i++) {
    let pageData = await fetch(`${url}?page=${i}`).then((r) => r.json());
    todos = [...todos, ...pageData.results];
  }
  return todos;
}

let todosLosPersonajes = [];

(async () => {
  todosLosPersonajes = await cargarTodosLosPersonajes();
})();

let search = document.getElementById("search");
let filtro = document.getElementById("filtro");

search.addEventListener("input", aplicarFiltros);
filtro.addEventListener("input", aplicarFiltros);

function aplicarFiltros() {
  const textoBusqueda = search.value.toLowerCase();
  const textoFiltro = filtro.value.toLowerCase();

  // Si ambos están vacíos, recargar la paginación normal
  if (textoBusqueda === "" && textoFiltro === "") {
    app.innerHTML = "";
    cargarPersonajes(paginaActual);
    habilitarPagination();
    return;
  }

  // Filtrado combinado
  const filtrados = todosLosPersonajes.filter((personaje) => {
    const coincideNombre = personaje.name.toLowerCase().includes(textoBusqueda);

    const coincideEstado = personaje.status.toLowerCase().includes(textoFiltro);

    return coincideNombre && coincideEstado;
  });

  app.innerHTML = "";

  if (filtrados.length === 0) {
    app.innerHTML = ` <div class="no-results"> <p>No se encontraron personajes con esos filtros...</p> </div> `;
    return;
  }

  mostrarPersonajes(filtrados);
  desabilitarPagination();
}
