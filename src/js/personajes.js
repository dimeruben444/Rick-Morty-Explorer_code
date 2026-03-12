//-------------------------------------------------
//Logica personajes: renderiza y carga personajes
//-----------------------------------------------



import { abrirOverlay } from "./ui.js";
import {guardarFav } from "./favoritos.js";




export function mostrarPersonajes(arrPersonajes) {
  const app = document.getElementById("app");
  const favs = JSON.parse(localStorage.getItem("arrayFavId")) || [];
  app.innerHTML = "";

  //por cada personaje crea una card


  arrPersonajes.forEach((personaje) => {
    const newCard = document.createElement("div");
    newCard.innerHTML = `
        <div class="id " id="${personaje.id}" ></div>
        <div class="img-container">
            <img src= "${personaje.image}" alt="">
            <button class="status ${personaje.status} ">${personaje.status}</button>

            <button class="favorite-btn " >🤍</button>
           
        </div>
        <div class="info-container">
            <h3 class="character-name">${personaje.name}</h3>
            <p class="character-specie">${personaje.gender} - ${personaje.species}</p>
            <p class="character-location"><span>📍</span> ${personaje.location.name} </p>
        </div>
    `;

    // Abrir overlay al hacer click en la card
    newCard.addEventListener("click", (e) => {
      console.log("abriendo overlay");
      abrirOverlay(personaje);
    });


    //Boton favoritos
    const favBtn = newCard.querySelector(".favorite-btn");

    if (favs.includes(personaje.id)) {
      favBtn.classList.add("active");
      favBtn.textContent = "❤️";
    }

    favBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      guardarFav(e);
    });

    const updatedFavs = JSON.parse(localStorage.getItem("arrayFavId")) || [];

    if (updatedFavs.includes(personaje.id)) {
      favBtn.classList.add("active");
      favBtn.textContent = "❤️";
    } else {
      favBtn.classList.remove("active");
      favBtn.textContent = "🤍";
    }
    
 

    
    newCard.classList.add("card");
    app.appendChild(newCard);
  });
}

