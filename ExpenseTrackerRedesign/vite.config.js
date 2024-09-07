import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://expense-tracker-app-backend-rose.vercel.app/',
        changeOrigin: true,
      },
    },
  },
});
