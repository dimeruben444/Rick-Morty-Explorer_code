// ============================================
// MAIN.JS - PUNTO DE ENTRADA DE LA APLICACIÓN
// ============================================

import "../sass/style.scss";

// Importar módulos
import { inicializarHeader } from "./ui.js";
import { cargarPersonajes } from "./personajes.js";
import { cargarEpisodios } from "./episodios.js";
import { cargarPersonajesFavoritos, inicializarContadorFavoritos } from "./favoritos.js";
import { scrollUp } from "./utils.js";
import {
  estadoPaginacion,
  actualizarInfoPaginacion,
  actualizarBotonesPaginacion,
} from "./paginacion.js";
import { inicializarFiltros, aplicarFiltros } from "./filtros.js";

console.log("🚀 Rick and Morty Explorer - Iniciando...");

// ============================================
// ELEMENTOS DEL DOM
// ============================================
const app = document.querySelector("#app");
const pagInfo = document.getElementById("paginfo");
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
const btnCh = document.getElementById("btn-ch");
const btnEp = document.getElementById("btn-ep");
const btnFav = document.getElementById("btn-fav");
const inputBusqueda = document.getElementById("search");
const selectFiltro = document.getElementById("filtro");
const explorerSection = document.getElementById("explorer");

// ============================================
// INICIALIZACIÓN DE LA APP
// ============================================
async function inicializarApp() {
  console.log("📦 Inicializando componentes...");

  // 1. Inicializar header con efecto scroll
  inicializarHeader();

  // 2. Inicializar contador de favoritos
  inicializarContadorFavoritos();

  // 3. Cargar todos los personajes para filtros (en background)
  inicializarFiltros();

  // 4. Cargar primera página de personajes
  await cargarPersonajes(1, app, estadoPaginacion);
  actualizarInfoPaginacion(pagInfo);
  actualizarBotonesPaginacion(btnAnterior, btnSiguiente);

  console.log("✅ App inicializada correctamente");
}

// Iniciar la aplicación
inicializarApp();

// ============================================
// NAVEGACIÓN PRINCIPAL
// Botones: Personajes / Episodios / Favoritos
// ============================================

btnCh.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("📍 Vista: Personajes");

  // Actualizar botones activos
  btnEp.classList.remove("active");
  btnFav.classList.remove("active");
  btnCh.classList.add("active");

  // Mostrar sección de filtros
  if (explorerSection) explorerSection.style.display = "inherit";

  // Cargar personajes
  await cargarPersonajes(1, app, estadoPaginacion);
  actualizarInfoPaginacion(pagInfo);
  actualizarBotonesPaginacion(btnAnterior, btnSiguiente);
  scrollUp();
});

btnEp.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("📍 Vista: Episodios");

  // Actualizar botones activos
  btnCh.classList.remove("active");
  btnFav.classList.remove("active");
  btnEp.classList.add("active");

  // Ocultar sección de filtros (no hay filtros para episodios)
  if (explorerSection) explorerSection.style.display = "none";

  // Cargar episodios
  await cargarEpisodios(1, app, estadoPaginacion);
  actualizarInfoPaginacion(pagInfo);
  actualizarBotonesPaginacion(btnAnterior, btnSiguiente);
  scrollUp();
});

btnFav.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("📍 Vista: Favoritos");

  // Actualizar botones activos
  btnCh.classList.remove("active");
  btnEp.classList.remove("active");
  btnFav.classList.add("active");

  // Mostrar sección de filtros
  if (explorerSection) explorerSection.style.display = "inherit";

  // Cargar favoritos
  cargarPersonajesFavoritos(app);
});

// ============================================
// PAGINACIÓN
// Botones: Anterior / Siguiente
// ============================================

btnSiguiente.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("➡️ Página siguiente");

  // Cargar siguiente página según vista activa
  if (btnCh.classList.contains("active")) {
    await cargarPersonajes(estadoPaginacion.paginaActual + 1, app, estadoPaginacion);
  } else if (btnEp.classList.contains("active")) {
    await cargarEpisodios(estadoPaginacion.paginaActual + 1, app, estadoPaginacion);
  }

  // Actualizar UI
  actualizarInfoPaginacion(pagInfo);
  actualizarBotonesPaginacion(btnAnterior, btnSiguiente);
  scrollUp();
});

btnAnterior.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("⬅️ Página anterior");

  // Cargar página anterior según vista activa
  if (btnCh.classList.contains("active")) {
    await cargarPersonajes(estadoPaginacion.paginaActual - 1, app, estadoPaginacion);
  } else if (btnEp.classList.contains("active")) {
    await cargarEpisodios(estadoPaginacion.paginaActual - 1, app, estadoPaginacion);
  }

  // Actualizar UI
  actualizarInfoPaginacion(pagInfo);
  actualizarBotonesPaginacion(btnAnterior, btnSiguiente);
  scrollUp();
});

// ============================================
// FILTROS Y BÚSQUEDA
// ============================================

// Función auxiliar para aplicar filtros
function ejecutarFiltros() {
  aplicarFiltros(
    inputBusqueda,
    selectFiltro,
    app,
    (pagina) => cargarPersonajes(pagina, app, estadoPaginacion),
    btnAnterior,
    btnSiguiente
  );
}

// Event listener para el input de búsqueda
if (inputBusqueda) {
  inputBusqueda.addEventListener("input", () => {
    console.log("🔍 Búsqueda:", inputBusqueda.value);
    ejecutarFiltros();
  });
}

// Event listener para el select de filtro de estado
if (selectFiltro) {
  selectFiltro.addEventListener("change", () => {
    console.log("🎯 Filtro de estado:", selectFiltro.value);
    ejecutarFiltros();
  });
}

console.log("✅ Event listeners configurados");
