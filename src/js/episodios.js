



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




const cargarEpisodiosPersonaje = async (episodio) => {
  const response = await fetch(episodio);
  const data = await response.json();
  return data;
};

export async function episodiosPersonaje(arrEpisodiosPersonaje) {

  const episodios = await Promise.all(
    arrEpisodiosPersonaje.map(url => cargarEpisodiosPersonaje(url))
  );

  const contenedor = document.getElementById("informacion");

  episodios.forEach(ep => {
    const div = document.createElement("div");
    div.innerHTML = ` <span class="epep">${ep.episode}</span> - <span class="eptittle">${ep.name}</span>`;
    contenedor.appendChild(div);
  });
}