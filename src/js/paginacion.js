// ============================================
// SISTEMA DE PAGINACIÓN
// ============================================

/**
 * Estado global de paginación
 */
export const estadoPaginacion = {
  paginaActual: 1,
  totalPaginas: 1,
};

/**
 * Actualizar el texto indicador de página actual
 * @param {HTMLElement} elemento - Elemento donde mostrar "Página X de Y"
 */
export function actualizarInfoPaginacion(elemento) {
  if (!elemento) return;
  
  elemento.innerHTML = `Página ${estadoPaginacion.paginaActual} de ${estadoPaginacion.totalPaginas}`;
}

/**
 * Habilitar/deshabilitar botones según la página actual
 * @param {HTMLElement} btnAnterior - Botón "Anterior"
 * @param {HTMLElement} btnSiguiente - Botón "Siguiente"
 */
export function actualizarBotonesPaginacion(btnAnterior, btnSiguiente) {
  if (!btnAnterior || !btnSiguiente) return;
  
  // Deshabilitar "Anterior" si estamos en la primera página
  btnAnterior.disabled = estadoPaginacion.paginaActual === 1;

  // Deshabilitar "Siguiente" si estamos en la última página
  btnSiguiente.disabled = estadoPaginacion.paginaActual === estadoPaginacion.totalPaginas;
}

/**
 * Deshabilitar completamente la paginación (útil cuando hay filtros activos)
 * @param {HTMLElement} btnAnterior - Botón "Anterior"
 * @param {HTMLElement} btnSiguiente - Botón "Siguiente"
 */
export function deshabilitarPaginacion(btnAnterior, btnSiguiente) {
  if (btnAnterior) btnAnterior.disabled = true;
  if (btnSiguiente) btnSiguiente.disabled = true;
}

/**
 * Habilitar la paginación (cuando se quitan filtros)
 * @param {HTMLElement} btnAnterior - Botón "Anterior"
 * @param {HTMLElement} btnSiguiente - Botón "Siguiente"
 */
export function habilitarPaginacion(btnAnterior, btnSiguiente) {
  if (btnAnterior) btnAnterior.disabled = false;
  if (btnSiguiente) btnSiguiente.disabled = false;
}
