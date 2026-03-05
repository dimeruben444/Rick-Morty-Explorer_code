// ============================================
// LÓGICA DE PERSONAJES
// ============================================

import { abrirOverlay } from "./ui.js";
import { toggleFavorito, isFavorite } from "./favoritos.js";

/**
 * Mostrar array de personajes en el DOM
 * @param {Array} personajes - Array de personajes
 * @param {HTMLElement} container - Contenedor donde renderizar
 */
export function mostrarPersonajes(personajes, container) {
  container.innerHTML = "";

  personajes.forEach((personaje) => {
    const card = crearCardPersonaje(personaje);
    container.appendChild(card);
  });
}

/**
 * Crear tarjeta HTML de un personaje
 * @param {Object} personaje - Datos del personaje
 * @returns {HTMLElement} - Elemento div.card
 */
function crearCardPersonaje(personaje) {
  let newCard = document.createElement("div");
  newCard.classList.add("card");

  const esFavorito = isFavorite(personaje.id);

  newCard.innerHTML = `
    <div class="id" id="${personaje.id}"></div>
    <div class="img-container">
      <img src="${personaje.image}" alt="${personaje.name}">
      <button class="status ${personaje.status}">${personaje.status}</button>
      <button class="favorite-btn ${esFavorito ? 'active' : ''}">${esFavorito ? '❤️' : '🤍'}</button>
    </div>
    <div class="info-container">
      <h3 class="character-name">${personaje.name}</h3>
      <p class="character-specie">${personaje.gender} - ${personaje.species}</p>
      <p class="character-location">
        <span>📍</span> ${personaje.location.name}
      </p>
    </div>
  `;

  // Event listener para abrir overlay al hacer click en la tarjeta
  newCard.addEventListener("click", () => {
    console.log("Abriendo overlay de:", personaje.name);
    abrirOverlay(personaje);
  });

  // Event listener para el botón de favoritos
  const favBtn = newCard.querySelector(".favorite-btn");
  favBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); // No abrir overlay al hacer click en favorito
    toggleFavorito(e);
  });

  return newCard;
}

/**
 * Cargar personajes desde la API y renderizarlos
 * @param {number} numeroPagina - Número de página a cargar
 * @param {HTMLElement} container - Contenedor donde renderizar
 * @param {Object} estadoPaginacion - Objeto con paginaActual y totalPaginas
 * @returns {Promise<Object>} - Info de paginación de la API
 */
export async function cargarPersonajes(numeroPagina, container, estadoPaginacion) {
  container.innerHTML = "<p>Cargando...</p>";

  const { fetchPersonajes } = await import("./api.js");
  
  try {
    const data = await fetchPersonajes(numeroPagina);

    // Actualizar estado de paginación
    estadoPaginacion.paginaActual = numeroPagina;
    estadoPaginacion.totalPaginas = data.info.pages;

    container.innerHTML = "";
    mostrarPersonajes(data.results, container);

    console.log(`Personajes cargados - Página ${numeroPagina} de ${data.info.pages}`);

    return data.info;
  } catch (error) {
    console.error("Error cargando personajes:", error);
    container.innerHTML = `
      <div class="no-results">
        <p>Error al cargar personajes. Por favor, intenta de nuevo.</p>
      </div>
    `;
  }
}
