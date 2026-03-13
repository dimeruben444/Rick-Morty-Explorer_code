console.log("MAIN CARGADO");
import "../sass/style.scss";

import { ocultarHeaderScroll ,inicializarContadorFav } from "./ui.js";
import { cargarPersonajes, buttonAnterior, buttonSiguiente ,paginaSiguiente, paginaAnterior} from "./paginacion.js";
import { cargarEpisodios } from "./paginacion.js";
import { cargarPersonajesFav } from "./favoritos.js";
import "./filtros.js";


document.addEventListener("DOMContentLoaded", () => {
  cargarPersonajes(1);
  inicializarContadorFav();
  
});



//Al cargar el dom se ejecuta "ocultarHeaderScroll()""
document.addEventListener("DOMContentLoaded", () => {
  ocultarHeaderScroll();
});


buttonSiguiente.addEventListener("click", (e) => {
  e.preventDefault();
  paginaSiguiente();
});

buttonAnterior.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("anterior");
  paginaAnterior();
});

const btnEp = document.getElementById("btn-ep");
const btnCh = document.getElementById("btn-ch");
const btnFav = document.getElementById("btn-fav");

btnEp.addEventListener("click", (e) => {
  e.preventDefault();
  btnCh.classList.remove("active");
   btnFav.classList.remove("active");
  btnEp.classList.add("active");
  document.getElementById("explorer").style.display = "none";
  cargarEpisodios(1);
});

btnCh.addEventListener("click", (e) => {
  e.preventDefault();
  
  btnEp.classList.remove("active");
  btnFav.classList.remove("active");
  btnCh.classList.add("active");
  document.getElementById("explorer").style.display = "inherit";
  cargarPersonajes(1);
});

btnFav.addEventListener("click", (e) => {
  e.preventDefault();
  
  btnCh.classList.remove("active");
  btnEp.classList.remove("active");
  btnFav.classList.add("active");
  document.getElementById("explorer").style.display = "none";
  
  cargarPersonajesFav();
  
});