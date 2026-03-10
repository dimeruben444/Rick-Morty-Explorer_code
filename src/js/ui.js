//--------------------------------------------------
//Interfaz de usuario : efectos visuales y modales 
//--------------------------------------------------
import { episodiosPersonaje } from "./episodios";


//Funcion que oculta el header al hacer scroll hacia abajo y lo muestra al hacerlo hacia arriba 
export function ocultarHeaderScroll(){
    let lastScroll = 0;
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll) { // Scroll hacia abajo → ocultar
            header.classList.add("hidden");
        } else { // Scroll hacia arriba → mostrar
            header.classList.remove("hidden");
        }
        lastScroll = currentScroll;
    });
}


export function abrirOverlay(personaje) {
  let overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
  episodiosPersonaje(personaje.episode)

  //console.log(personaje.episode);

  overlay.innerHTML = ` 

       <div class="overlay-container">
            <div class="overlay-img-container"> 
                <button id="close-overlay">X</button> 
                <img src="${personaje.image}" alt=""> 
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
                <article class=""> 
                    <h4>Apariciones (${personaje.episode.length})</h4> 
                    
                    <div id="informacion"></div>
                </article> 
            </section> 
        </div> 
    `;

  let close = document.getElementById("close-overlay");

  close.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.style.display = "none";
    document.body.style.overflow = "scroll";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      e.target.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}




