
import './sass/style.scss'

let urlApi = 'https://rickandmortyapi.com/api/character'

let arrPersonajes = []

fetch(urlApi)
    .then((response)=> response.json())
    .then(data => {
        arrPersonajes = data.results
        mostrarpersonajes(arrPersonajes)
})
 

let app = document.querySelector('#app')


function mostrarpersonajes(arrPersonajes){
    arrPersonajes.forEach( personaje => {
        let newCard = document.createElement('div')
        newCard.innerHTML =`
            <div class="character-card">
      
                <div class="img-container">
                    <img src= "${personaje.image}" alt="">
                    <button class="status">${personaje.status}</button>
                </div>
                <div class="info-container">
                    <h3 class="character-name">${personaje.name}</h3>
                    <p class="character-specie">${personaje.gender} - ${personaje.species}</p>
                    <p class="character-location">${personaje.location.name} </p>
                </div>
            </div>
        
        `
        
        app.appendChild(newCard)
    });
}
