
// LLAMADAS A LA API DE RICK AND MORTY


const API_BASE = "https://rickandmortyapi.com/api";

/**
 * Obtener personajes de una página específica
 * @param {number} pagina - Número de página
 * @returns {Promise<Object>} - Datos de la API
 */
export async function fetchPersonajes(pagina = 1) {
  const url = `${API_BASE}/character/?page=${pagina}`;
  const response = await fetch(url);
  return await response.json();
}

/**
 * Obtener episodios de una página específica
 * @param {number} pagina - Número de página
 * @returns {Promise<Object>} - Datos de la API
 */
export async function fetchEpisodios(pagina = 1) {
  const url = `${API_BASE}/episode/?page=${pagina}`;
  const response = await fetch(url);
  return await response.json();
}

/**
 * Obtener personajes por IDs
 * @param {string} ids - IDs separados por coma (ej: "1,2,3")
 * @returns {Promise<Object|Array>} - Personaje único o array de personajes
 */
export async function fetchPersonajesPorIds(ids) {
  const url = `${API_BASE}/character/${ids}`;
  const response = await fetch(url);
  return await response.json();
}

/**
 * Cargar TODOS los personajes de la API (todas las páginas)
 * ADVERTENCIA: Esta función hace muchas peticiones, usar solo para filtros
 * @returns {Promise<Array>} - Array con todos los personajes
 */
export async function fetchTodosLosPersonajes() {
  console.log("Cargando todos los personajes...");
  
  let url = `${API_BASE}/character`;
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
  
  console.log(`Total personajes cargados: ${todos.length}`);
  return todos;
}
