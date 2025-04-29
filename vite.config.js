import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs', // ou 'dist', se preferir
  },
  base: '/recycle/', // Caminho base correto para funcionar em subpasta
});
