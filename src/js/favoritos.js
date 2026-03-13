import { desabilitarPagination,borrarPagInfo } from "./paginacion";
import { abrirOverlay } from "./ui";

let arrPersonajesFav = [];

export function mostrarFavoritos(arrPersonajesFav) {
  app.innerHTML = "";
  const favs = JSON.parse(localStorage.getItem("arrayFavId")) || [];

  arrPersonajesFav.forEach((personaje) => {
    let newCard = document.createElement("div");
    newCard.innerHTML = `
        <div class="id" id="${personaje.id}"></div>
        <div class="img-container">
            <img src="${personaje.image}" alt="">
            <button class="status ${personaje.status}">${personaje.status}</button>
            <button class="favorite-btn">🤍</button>
        </div>
        <div class="info-container">
            <h3 class="character-name">${personaje.name}</h3>
            <p class="character-specie">${personaje.gender} - ${personaje.species}</p>
            <p class="character-location"><span>📍</span> ${personaje.location.name}</p>
        </div>
    `;

    newCard.addEventListener("click", () => {
      abrirOverlay(personaje);
    });

    const favBtn = newCard.querySelector(".favorite-btn");

    // Marcar favoritos ya guardados
    if (favs.includes(personaje.id)) {
      favBtn.classList.add("active");
      favBtn.textContent = "❤️";
    }

    favBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const removed = guardarFav(e);
        if (removed) {
            cargarPersonajesFav();
        }
    });


    newCard.classList.add("card");
    app.appendChild(newCard);
    
  });
  desabilitarPagination()
  borrarPagInfo()
}



export const cargarPersonajesFav = async () => {
  document.getElementById("app").innerHTML = "<p>Cargando...</p>";
  

   const favIds = JSON.parse(localStorage.getItem("arrayFavId")) || [];

   if (favIds.length === 0) {
    app.innerHTML = `
      <div class="no-favs">
        <p>Guarda tus personajes favoritos para visualizar.</p>
      </div>
    `;
    actualizarPagInfo?.();
    
    return;
  }

  let urlApi = `https://rickandmortyapi.com/api/character/${localStorage.getItem('arrayFavId')}`;

  await fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {
      arrPersonajesFav = Array.isArray(data) ? data : [data];

      document.getElementById("app").innerHTML = "";

      mostrarFavoritos(arrPersonajesFav);
      actualizarPagInfo();
      paginationImposible();
      
      scrollUp();
    });
    
};


export function guardarFav(e) {
  const card = e.target.closest(".card");
  const id = Number(card.querySelector(".id").id);

  let favs = JSON.parse(localStorage.getItem("arrayFavId")) || [];

  const isFav = favs.includes(id);

  if (!isFav) {
    favs.push(id);
    e.target.classList.add("active");
    e.target.textContent = "❤️";
  } else {
    favs = favs.filter(f => f !== id);
    e.target.classList.remove("active");
    e.target.textContent = "🤍";
  }

  localStorage.setItem("arrayFavId", JSON.stringify(favs));

  // actualizar contador
  const countFav = document.getElementById("count-fav");
  countFav.textContent = favs.length;
  countFav.style.display = favs.length > 0 ? "inline-block" : "none";

  return isFav; // 🔥 devuelve true si se eliminó
}


