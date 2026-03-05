// ============================================
// UTILIDADES GENERALES
// ============================================

/**
 * Scroll suave hacia arriba de la página
 */
export function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/**
 * Guardar array de favoritos en localStorage
 * @param {Array} arrFav - Array de IDs de favoritos
 */
export function actualizarLocalStorage(arrFav) {
  localStorage.setItem("arrayFavId", JSON.stringify(arrFav));
}

/**
 * Obtener array de favoritos desde localStorage
 * @returns {Array} - Array de IDs de favoritos
 */
export function obtenerLocalStorage() {
  const data = localStorage.getItem("arrayFavId");
  return data ? JSON.parse(data) : [];
}
