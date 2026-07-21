import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Punjab Weather — front-end only, no backend/server code of any kind.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
