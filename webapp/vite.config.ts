import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    EnvironmentPlugin('all'),
    createHtmlPlugin({
      minify: true,
      entry: 'src/index.tsx',
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis', // <-- AWS SDK
      },
    },
  },
  server: {
    port: 6001,
  },
});
