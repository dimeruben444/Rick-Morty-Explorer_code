
import { mostrarPersonajes } from "./personajes.js";
import { mostrarEpisodios } from "./episodios.js";
import { scrollUp } from "./ui.js";




export let paginaActual = 1;
export let totalPaginas = 1;
export let arrPersonajes = [];
export let arrEpisodios = [];

export const cargarPersonajes = async (numeroPagina) => {
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





export const cargarEpisodios = async (numeroPagina) => {
  document.getElementById("app").innerHTML = "<p>Cargando...</p>";

  const urlApi = `https://rickandmortyapi.com/api/episode/?page=${numeroPagina}`;

  await fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {
      arrEpisodios = data.results;
      console.log(arrEpisodios)
      paginaActual = numeroPagina;
      totalPaginas = data.info.pages;

      document.getElementById("app").innerHTML = "";

      mostrarEpisodios(arrEpisodios);
      actualizarPagInfo();
      paginationImposible();

      scrollUp();
    });
};

const btnEp = document.getElementById("btn-ep");
const btnCh = document.getElementById("btn-ch");
const btnFav = document.getElementById("btn-fav");

export function actualizarPagInfo() {
  const pagInfo = document.getElementById("paginfo");
  pagInfo.innerHTML = `Página ${paginaActual} de ${totalPaginas}`;
}

export function paginaSiguiente() {
  if (btnCh.classList.contains("active") && paginaActual < totalPaginas) {
    cargarPersonajes(paginaActual + 1); 
  }
  if (btnEp.classList.contains("active") && paginaActual < totalPaginas) {
    cargarEpisodios(paginaActual + 1);
  }
}

export function paginaAnterior() {
  if (btnCh.classList.contains("active") && paginaActual > 1) {
    cargarPersonajes(paginaActual - 1); 
  }
  if (btnEp.classList.contains("active") && paginaActual > 1) {
    cargarEpisodios(paginaActual - 1);
  }
}

export const buttonSiguiente = document.getElementById("siguiente");
export const buttonAnterior = document.getElementById("anterior");

buttonSiguiente.addEventListener("click", (e) => {
  e.preventDefault();
  paginaSiguiente();
});

buttonAnterior.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("anterior");
  paginaAnterior();
});

export function desabilitarPagination() {
  buttonSiguiente.disabled = true;
  buttonAnterior.disabled = true;
}

export function habilitarPagination() {
  buttonSiguiente.disabled = false;
  buttonAnterior.disabled = false;
}

export function paginationImposible() {
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