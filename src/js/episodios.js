




export function mostrarEpisodios(arrEpisodios) {
  const app = document.getElementById("app");
  app.innerHTML = "";
  arrEpisodios.forEach((episodio) => {
    const newEp = document.createElement("div");
    newEp.innerHTML = `
        <div class="ep-container">
            <p class="ep">Episodio</p>
            <p class="episode">${episodio.episode}</p>
            
            <h3 class="ep-name">${episodio.name}</h3> 
            <p class="estreno">Estreno<p class="ep-air">${episodio.air_date}</p></p>
            
            
        </div>
    `;

   

    newEp.classList.add("ep");
    app.appendChild(newEp);
  });
}