// ============================================
// SISTEMA DE FAVORITOS
// ============================================

import { actualizarLocalStorage, obtenerLocalStorage } from "./utils.js";
import { mostrarPersonajes } from "./personajes.js";
import { fetchPersonajesPorIds } from "./api.js";

// Estado de favoritos
export let arrFav = obtenerLocalStorage();
export let totalFav = arrFav.length;

/**
 * Verificar si un personaje es favorito
 * @param {number|string} id - ID del personaje
 * @returns {boolean}
 */
export function isFavorite(id) {
  return arrFav.includes(String(id));
}

/**
 * Agregar/quitar favorito al hacer click en el botón
 * @param {Event} e - Evento del click
 */
export function toggleFavorito(e) {
  const target = e.target;
  const card = target.closest(".card");
  const cardId = card.querySelector(".id").getAttribute("id");
  const countFav = document.getElementById("count-fav");

  if (!target.classList.contains("active")) {
    // Agregar a favoritos
    target.classList.add("active");
    target.innerHTML = "❤️";

    arrFav.push(cardId);
    totalFav++;

    console.log("✅ Favorito agregado:", cardId);
  } else {
    // Quitar de favoritos
    target.classList.remove("active");
    target.innerHTML = "🤍";

    const indice = arrFav.indexOf(cardId);
    arrFav.splice(indice, 1);
    totalFav--;

    console.log("❌ Favorito eliminado:", cardId);
  }

  // Actualizar localStorage
  actualizarLocalStorage(arrFav);

  // Actualizar contador visual
  actualizarContadorFavoritos(countFav, totalFav);
}

/**
 * Actualizar el contador de favoritos en el header
 * @param {HTMLElement} elemento - Elemento del contador
 * @param {number} total - Total de favoritos
 */
function actualizarContadorFavoritos(elemento, total) {
  if (!elemento) return;
  
  elemento.textContent = total;
  elemento.style.display = total > 0 ? "inline-block" : "none";
}

/**
 * Cargar y mostrar personajes favoritos
 * @param {HTMLElement} container - Contenedor donde renderizar
 */
export async function cargarPersonajesFavoritos(container) {
  container.innerHTML = "<p>Cargando favoritos...</p>";

  const ids = obtenerLocalStorage();

  // Si no hay favoritos
  if (ids.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <p>No tienes favoritos aún...</p>
        <p>Explora personajes y marca tus favoritos ❤️</p>
      </div>
    `;
    return;
  }

  try {
    const data = await fetchPersonajesPorIds(ids.join(","));
    
    // La API retorna un objeto si es 1 personaje, o array si son varios
    const personajes = Array.isArray(data) ? data : [data];

    container.innerHTML = "";
    mostrarPersonajes(personajes, container);

    console.log(`✅ ${personajes.length} favoritos cargados`);
  } catch (error) {
    console.error("Error cargando favoritos:", error);
    container.innerHTML = `
      <div class="no-results">
        <p>Error al cargar favoritos. Por favor, intenta de nuevo.</p>
      </div>
    `;
  }
}

/**
 * Inicializar el contador de favoritos al cargar la página
 */
export function inicializarContadorFavoritos() {
  const countFav = document.getElementById("count-fav");
  if (countFav) {
    actualizarContadorFavoritos(countFav, totalFav);
  }
}
