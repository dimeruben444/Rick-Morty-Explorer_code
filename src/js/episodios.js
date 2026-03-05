// ============================================
// LÓGICA DE EPISODIOS
// ============================================

/**
 * Mostrar array de episodios en el DOM
 * @param {Array} episodios - Array de episodios
 * @param {HTMLElement} container - Contenedor donde renderizar
 */
export function mostrarEpisodios(episodios, container) {
  container.innerHTML = "";

  episodios.forEach((episodio) => {
    const epCard = crearCardEpisodio(episodio);
    container.appendChild(epCard);
  });
}

/**
 * Crear tarjeta HTML de un episodio
 * @param {Object} episodio - Datos del episodio
 * @returns {HTMLElement} - Elemento div.ep
 */
function crearCardEpisodio(episodio) {
  let newEp = document.createElement("div");
  newEp.classList.add("ep");

  newEp.innerHTML = `
    <div class="ep-container">
      <p class="ep">Episodio</p>
      <p class="episode">${episodio.episode}</p>
      <h3 class="ep-name">${episodio.name}</h3>
      <p class="estreno">
        Estreno
        <p class="ep-air">${episodio.air_date}</p>
      </p>
    </div>
  `;

  return newEp;
}

/**
 * Cargar episodios desde la API y renderizarlos
 * @param {number} numeroPagina - Número de página a cargar
 * @param {HTMLElement} container - Contenedor donde renderizar
 * @param {Object} estadoPaginacion - Objeto con paginaActual y totalPaginas
 * @returns {Promise<Object>} - Info de paginación de la API
 */
export async function cargarEpisodios(numeroPagina, container, estadoPaginacion) {
  container.innerHTML = "<p>Cargando...</p>";

  const { fetchEpisodios } = await import("./api.js");

  try {
    const data = await fetchEpisodios(numeroPagina);

    // Actualizar estado de paginación
    estadoPaginacion.paginaActual = numeroPagina;
    estadoPaginacion.totalPaginas = data.info.pages;

    container.innerHTML = "";
    mostrarEpisodios(data.results, container);

    console.log(`Episodios cargados - Página ${numeroPagina} de ${data.info.pages}`);

    return data.info;
  } catch (error) {
    console.error("Error cargando episodios:", error);
    container.innerHTML = `
      <div class="no-results">
        <p>Error al cargar episodios. Por favor, intenta de nuevo.</p>
      </div>
    `;
  }
}
