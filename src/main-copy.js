import './sass/style.scss'


console.log('App iniciada');

// Variable para guardar todos los personajes
let todosLosPersonajes = [];

// 1. Cargar personajes al inicio
fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => {
        todosLosPersonajes = data.results;
        mostrarPersonajes(todosLosPersonajes);
});

// 2. Escuchar cuando escriben en el buscador
document.getElementById('search').addEventListener('input', function(e) {
    const busqueda = e.target.value.toLowerCase();
    console.log('Buscando:', busqueda);
    
    // Filtrar personajes
    const filtrados = todosLosPersonajes.filter(personaje => {
        return personaje.name.toLowerCase().includes(busqueda);
    });
    
    mostrarPersonajes(filtrados);
});

// 3. Función para mostrar personajes
function mostrarPersonajes(personajes) {
    const app = document.getElementById('app');
    
    if (personajes.length === 0) {
        app.innerHTML = '<p>No se encontraron personajes</p>';
        return;
    }
    
    let html = '<div class="grid">';
    
    personajes.forEach(personaje => {
        html += `
            <div class="card">
                <img src="${personaje.image}">
                <h3>${personaje.name}</h3>
                <p>${personaje.species}</p>
            </div>
        `;
    });
    
    html += '</div>';
    
    app.innerHTML = html;
}