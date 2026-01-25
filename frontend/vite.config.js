import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',           // important for correct asset paths
  publicDir: 'public', // ensures _redirects is copied
  build: {
    outDir: 'dist'
  }
});

