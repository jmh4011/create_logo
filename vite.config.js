import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(), // React와 JSX 지원
  ],
  resolve: {
    alias: {
      "react-helmet": "react-helmet-async", // CommonJS 모듈을 ESM으로 매핑
    },
  },
  optimizeDeps: {
    include: [
      "react-helmet",        // CommonJS 호환
      "redux",               // Redux ESM 처리
      "tailwind-scrollbar",  // Tailwind 플러그인
    ],
    esbuildOptions: {
      loader: {
        '.js': 'jsx', // CommonJS 파일에서 JSX 변환
      },
    },
  },
  server: {
    host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접근 가능
    port: 10000,      // 개발 서버 포트 설정
  },
  build: {
    chunkSizeWarningLimit: 500, // 번들 크기 경고 한도를 설정하여 불필요한 경고 방지
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // react-icons, react-dom 등의 모듈을 별도 청크로 분리
          if (id.includes('node_modules')) {
            if (id.includes('react-icons')) {
              return 'react-icons';
            }
            if (id.includes('react-dom')) {
              return 'react-dom';
            }
          }
        },
      },
    },
  },
});
