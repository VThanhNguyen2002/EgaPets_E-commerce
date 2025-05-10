import { defineConfig } from 'vite';
import react            from '@vitejs/plugin-react';
import tsconfigPaths    from 'vite-tsconfig-paths';   // ①
import path             from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()                                // ② đồng bộ alias tự động
  ],
  resolve: {
    alias: {
      '@':         path.resolve(__dirname, 'src'), // alias gốc
      '@assets':   path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@context':  path.resolve(__dirname, 'src/context'),
      '@hooks':    path.resolve(__dirname, 'src/hooks'),
      '@layouts':  path.resolve(__dirname, 'src/layouts'),
      '@pages':    path.resolve(__dirname, 'src/pages'),
      '@routes':   path.resolve(__dirname, 'src/routes'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@store':    path.resolve(__dirname, 'src/store'),
      '@types':    path.resolve(__dirname, 'src/types'),
      '@utils':    path.resolve(__dirname, 'src/utils')
    }
  },
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:5000",
        changeOrigin:true,
        secure:false,
        cookieDomainRewrite: "localhost",
      }
    }
  }
});
