// ============================================
// INTERFAZ DE USUARIO (UI)
// ============================================

/**
 * Inicializar el efecto de scroll en el header
 * El header se oculta al hacer scroll hacia abajo y se muestra al subir
 */
export function inicializarHeader() {
  let lastScroll = 0;
  const header = document.querySelector("header");

  if (!header) {
    console.warn("Header no encontrado en el DOM");
    return;
  }

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
      // Scroll hacia abajo → ocultar header
      header.classList.add("hidden");
    } else {
      // Scroll hacia arriba → mostrar header
      header.classList.remove("hidden");
    }

    lastScroll = currentScroll;
  });

  console.log("✅ Header scroll effect inicializado");
}

/**
 * Abrir overlay/modal con detalles del personaje
 * @param {Object} personaje - Datos del personaje
 */
export function abrirOverlay(personaje) {
  const overlay = document.getElementById("overlay");

  if (!overlay) {
    console.error("Overlay no encontrado en el DOM");
    return;
  }

  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";

  console.log("📖 Abriendo overlay de:", personaje.name);

  overlay.innerHTML = `
    <div class="overlay-container">
      <div class="overlay-img-container">
        <button id="close-overlay">X</button>
        <img src="${personaje.image}" alt="${personaje.name}">
      </div>
      <section class="detail-info-container">
        <article>
          <h3 class="character-name">${personaje.name}</h3>
          <h4 class="info-tittle">Información</h4>
          <div class="informacion">
            <div>
              <h5>ESTADO</h5>
              <p>${personaje.status}</p>
            </div>
            <div>
              <h5>ESPECIE</h5>
              <p>${personaje.species}</p>
            </div>
            <div>
              <h5>GÉNERO</h5>
              <p>${personaje.gender}</p>
            </div>
            <div>
              <h5>ORIGEN</h5>
              <p>${personaje.origin.name}</p>
            </div>
            <div>
              <h5>UBICACIÓN</h5>
              <p>${personaje.location.name}</p>
            </div>
          </div>
        </article>
        <article class="episodes">
          <h4>Apariciones (${personaje.episode.length} episodios)</h4>
        </article>
      </section>
    </div>
  `;

  // Event listener para cerrar con el botón X
  const closeBtn = document.getElementById("close-overlay");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      cerrarOverlay();
    });
  }

  // Event listener para cerrar al hacer click fuera del modal
  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      cerrarOverlay();
    }
  });
}

/**
 * Cerrar el overlay/modal
 */
export function cerrarOverlay() {
  const overlay = document.getElementById("overlay");

  if (overlay) {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
    console.log("❌ Overlay cerrado");
  }
}
