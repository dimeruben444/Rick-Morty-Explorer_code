# 🎯 Rick and Morty Explorer - Versión Modular

## 📁 Estructura de Archivos

```
proyecto/
├── index.html
├── sass/
│   └── style.scss
└── js/
    ├── main.js              ← Punto de entrada principal
    ├── api.js               ← Llamadas a la API
    ├── personajes.js        ← Lógica de personajes
    ├── episodios.js         ← Lógica de episodios
    ├── favoritos.js         ← Sistema de favoritos
    ├── paginacion.js        ← Lógica de paginación
    ├── filtros.js           ← Búsqueda y filtros
    ├── ui.js                ← Interfaz (header, overlay)
    └── utils.js             ← Utilidades generales
```

---

## 🚀 Cómo Usar

### 1. Copiar los Archivos

Copia todos los archivos `.js` a tu carpeta `js/`:

```
tu-proyecto/
├── index.html
└── js/
    ├── main.js
    ├── api.js
    ├── personajes.js
    ├── episodios.js
    ├── favoritos.js
    ├── paginacion.js
    ├── filtros.js
    ├── ui.js
    └── utils.js
```

### 2. Modificar tu HTML

**IMPORTANTE:** Cambia la importación de tu script en `index.html`:

**❌ Antes:**
```html
<script type="module" src="./main.js"></script>
```

**✅ Ahora:**
```html
<script type="module" src="./js/main.js"></script>
```

### 3. Verificar que tu Bundler esté Configurado

Si usas **Webpack**, **Vite**, o **Parcel**, asegúrate de que:
- Soporta ES6 modules (`import`/`export`)
- Procesa archivos `.scss`
- El entry point sea `js/main.js`

---

## 📋 Descripción de Cada Archivo

### `main.js` - Orquestador Principal
- **Responsabilidad:** Coordinar todos los módulos
- **Importa:** Todos los demás módulos
- **Contiene:** Event listeners principales, inicialización de la app
- **NO contiene:** Lógica de negocio (solo orquestación)

### `api.js` - Comunicación con la API
- **Responsabilidad:** TODAS las peticiones HTTP
- **Funciones:**
  - `fetchPersonajes(pagina)` - Obtener personajes
  - `fetchEpisodios(pagina)` - Obtener episodios
  - `fetchPersonajesPorIds(ids)` - Obtener personajes específicos
  - `fetchTodosLosPersonajes()` - Cargar todos (para filtros)

### `personajes.js` - Lógica de Personajes
- **Responsabilidad:** Renderizar y cargar personajes
- **Funciones:**
  - `mostrarPersonajes(personajes, container)` - Renderizar array
  - `cargarPersonajes(pagina, container, estado)` - Fetch + render

### `episodios.js` - Lógica de Episodios
- **Responsabilidad:** Renderizar y cargar episodios
- **Funciones:**
  - `mostrarEpisodios(episodios, container)`
  - `cargarEpisodios(pagina, container, estado)`

### `favoritos.js` - Sistema de Favoritos
- **Responsabilidad:** Gestión completa de favoritos
- **Funciones:**
  - `toggleFavorito(event)` - Agregar/quitar favorito
  - `isFavorite(id)` - Verificar si es favorito
  - `cargarPersonajesFavoritos(container)` - Mostrar favoritos
  - `inicializarContadorFavoritos()` - Actualizar contador

### `paginacion.js` - Sistema de Paginación
- **Responsabilidad:** Estado y control de paginación
- **Estado:** `estadoPaginacion` (paginaActual, totalPaginas)
- **Funciones:**
  - `actualizarInfoPaginacion(elemento)`
  - `actualizarBotonesPaginacion(btnAnt, btnSig)`
  - `deshabilitarPaginacion()` / `habilitarPaginacion()`

### `filtros.js` - Búsqueda y Filtros
- **Responsabilidad:** Filtrado local de personajes
- **Funciones:**
  - `inicializarFiltros()` - Cargar todos los personajes
  - `aplicarFiltros(...)` - Filtrar por nombre y estado

### `ui.js` - Interfaz de Usuario
- **Responsabilidad:** Efectos visuales y modales
- **Funciones:**
  - `inicializarHeader()` - Efecto scroll header
  - `abrirOverlay(personaje)` - Mostrar detalles
  - `cerrarOverlay()` - Cerrar modal

### `utils.js` - Utilidades Generales
- **Responsabilidad:** Funciones auxiliares reutilizables
- **Funciones:**
  - `scrollUp()` - Scroll suave al inicio
  - `actualizarLocalStorage(arr)` - Guardar en localStorage
  - `obtenerLocalStorage()` - Leer de localStorage

---

## 🔄 Flujo de Datos

```
Usuario interactúa
    ↓
main.js (captura evento)
    ↓
Llama módulo correspondiente (personajes.js, episodios.js, etc)
    ↓
Módulo llama a api.js si necesita datos
    ↓
api.js hace fetch() y retorna datos
    ↓
Módulo renderiza datos en el DOM
    ↓
Actualiza paginacion.js si es necesario
```

---

## ✅ Ventajas de esta Organización

### 1. Separación de Responsabilidades
Cada archivo tiene UNA responsabilidad clara.

### 2. Reutilización
Puedes importar solo lo que necesitas:
```javascript
import { fetchPersonajes } from './api.js';
```

### 3. Mantenimiento
Fácil encontrar dónde está el código que necesitas modificar.

### 4. Testing
Cada módulo se puede testear independientemente.

### 5. Escalabilidad
Fácil agregar nuevas features sin tocar código existente.

### 6. Trabajo en Equipo
Varias personas pueden trabajar en archivos diferentes sin conflictos.

---

## 🐛 Debugging

Cada archivo tiene `console.log` estratégicos:

```javascript
console.log("✅ Personajes cargados");
console.log("🔍 Aplicando filtros");
console.log("📍 Vista: Episodios");
```

**Abre la consola (F12)** y verás el flujo completo de la aplicación.

---

## 📦 Imports/Exports - Ejemplos

### Exportar (en el módulo):
```javascript
// api.js
export async function fetchPersonajes(pagina) {
  // ...
}
```

### Importar (en main.js):
```javascript
import { fetchPersonajes } from './api.js';
```

### Exportar múltiples:
```javascript
export function funcion1() {}
export function funcion2() {}
```

### Importar múltiples:
```javascript
import { funcion1, funcion2 } from './modulo.js';
```

---

## 🎓 Conceptos Clave

### ES6 Modules
- Cada archivo es un módulo independiente
- Usa `import`/`export` para compartir código
- El navegador debe soportar `type="module"`

### Async/Await
- Todas las llamadas a la API usan `async/await`
- Más legible que `.then()`

### Separación de Responsabilidades
- **API layer**: Solo fetch
- **Business logic**: Procesar datos
- **UI layer**: Renderizar

---

## ⚠️ Errores Comunes

### Error: "Cannot use import outside a module"
**Solución:** Agrega `type="module"` al script tag
```html
<script type="module" src="./js/main.js"></script>
```

### Error: "Failed to resolve module specifier"
**Solución:** Verifica las rutas de los imports
```javascript
// ❌ Malo
import { algo } from 'api';

// ✅ Bueno
import { algo } from './api.js';
```

### Error: "X is not defined"
**Solución:** Asegúrate de exportar e importar correctamente
```javascript
// En api.js
export function fetchPersonajes() { }

// En main.js
import { fetchPersonajes } from './api.js';
```

---

## 📝 Próximos Pasos

Una vez que tengas esto funcionando, puedes:

1. **Agregar TypeScript** para type safety
2. **Implementar tests** con Jest
3. **Optimizar** con code splitting
4. **Agregar más features** (localizaciones, búsqueda avanzada)
5. **Implementar PWA** para uso offline

---

## 🆘 Ayuda

Si algo no funciona:
1. Abre la consola (F12)
2. Lee los errores
3. Verifica los imports/exports
4. Verifica las rutas de los archivos

---

**¡Código limpio, mantenible y profesional!** 🚀