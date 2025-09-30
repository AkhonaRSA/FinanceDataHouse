import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // ensure esbuild parses .js files as jsx (helps when components use .js extension)
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[tj]sx?$/
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
