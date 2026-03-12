import { cargarPersonajes, desabilitarPagination, habilitarPagination } from "./paginacion.js";
import { mostrarPersonajes } from "./personajes.js";
import { paginaActual } from "./paginacion.js";

const app = document.getElementById("app");
const search = document.getElementById("search");
const filtro = document.getElementById("filtro");

async function initFiltros() {
  console.log("Cargando todos los personajes...");
  todosLosPersonajes = await cargarTodosLosPersonajes();
  console.log("Personajes cargados:", todosLosPersonajes.length);

  // Activar listeners SOLO cuando ya están cargados
  search.addEventListener("input",aplicarFiltros);
  filtro.addEventListener("input", aplicarFiltros);
}

initFiltros();


export async function cargarTodosLosPersonajes() {
  let url = "https://rickandmortyapi.com/api/character";
  let data = await fetch(url)
    .then((r) => r.json());

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

export let todosLosPersonajes = [];

(async () => {
  todosLosPersonajes = await cargarTodosLosPersonajes();
})();









export function aplicarFiltros() {
  if (todosLosPersonajes.length === 0) {
    return;
  }
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


