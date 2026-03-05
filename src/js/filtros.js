// ============================================
// SISTEMA DE BÚSQUEDA Y FILTROS
// ============================================

import { mostrarPersonajes } from "./personajes.js";
import { fetchTodosLosPersonajes } from "./api.js";
import {
  deshabilitarPaginacion,
  habilitarPaginacion,
  estadoPaginacion,
} from "./paginacion.js";

// Cache de todos los personajes (se carga una vez al inicio)
let todosLosPersonajes = [];
let cargaCompleta = false;

/**
 * Cargar todos los personajes una sola vez al inicio de la app
 * Esto permite filtrar localmente sin hacer múltiples peticiones
 */
export async function inicializarFiltros() {
  if (cargaCompleta) return; // No cargar de nuevo si ya se cargó
  
  console.log("📥 Cargando todos los personajes para filtros...");
  todosLosPersonajes = await fetchTodosLosPersonajes();
  cargaCompleta = true;
  console.log(`✅ ${todosLosPersonajes.length} personajes listos para filtrar`);
}

/**
 * Aplicar filtros de búsqueda y estado
 * @param {HTMLInputElement} inputBusqueda - Input de búsqueda por nombre
 * @param {HTMLSelectElement} selectFiltro - Select de filtro por estado
 * @param {HTMLElement} container - Contenedor donde renderizar
 * @param {Function} cargarPersonajesCallback - Función para recargar personajes sin filtro
 * @param {HTMLElement} btnAnterior - Botón anterior de paginación
 * @param {HTMLElement} btnSiguiente - Botón siguiente de paginación
 */


export function aplicarFiltros(
  inputBusqueda,
  selectFiltro,
  container,
  cargarPersonajesCallback,
  btnAnterior,
  btnSiguiente
) {
  const textoBusqueda = inputBusqueda.value.toLowerCase().trim();
  const textoFiltro = selectFiltro.value.toLowerCase().trim();

  // Si ambos filtros están vacíos, volver a paginación normal
  if (textoBusqueda === "" && textoFiltro === "") {
    container.innerHTML = "";
    cargarPersonajesCallback(estadoPaginacion.paginaActual);
    habilitarPaginacion(btnAnterior, btnSiguiente);
    console.log("🔄 Filtros limpios - volviendo a paginación normal");
    return;
  }

  console.log("🔍 Aplicando filtros:", { nombre: textoBusqueda, estado: textoFiltro });

  // Filtrado combinado
  const filtrados = todosLosPersonajes.filter((personaje) => {
    const coincideNombre = personaje.name.toLowerCase().includes(textoBusqueda);
    const coincideEstado = textoFiltro === "" || personaje.status.toLowerCase().includes(textoFiltro);

    return coincideNombre && coincideEstado;
  });

  console.log(`✅ ${filtrados.length} personajes encontrados`);

  container.innerHTML = "";

  // Si no hay resultados
  if (filtrados.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <p>😕 No se encontraron personajes con esos filtros...</p>
        <p>Intenta con otros criterios de búsqueda</p>
      </div>
    `;
    deshabilitarPaginacion(btnAnterior, btnSiguiente);
    return;
  }

  // Mostrar resultados filtrados
  mostrarPersonajes(filtrados, container);
  
  // Deshabilitar paginación cuando hay filtros activos
  deshabilitarPaginacion(btnAnterior, btnSiguiente);
}
