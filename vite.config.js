import { defineConfig } from 'vite';

export default defineConfig({
  root: './', // raíz del proyecto, normalmente './'
  server: {
    port: 5173,   // o el que uses
    open: true,   // abre el navegador automáticamente
    watch: {
      usePolling: true, // útil si Hot Reload no funciona a veces
    },
  },
});