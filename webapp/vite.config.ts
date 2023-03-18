import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import externals from 'rollup-plugin-node-externals';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  build: {
    rollupOptions: {
      external: [
        'aws-amplify',
        '@aws-sdk/client-cognito-identity',
        '@aws-sdk/credential-provider-cognito-identity',
      ],
      plugins: [externals()],
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    global: 'window',
  },
});
