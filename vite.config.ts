import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['icons/*.svg', 'icons/*.png'],
          manifest: {
            name: '学术课程表',
            short_name: '课程表',
            description: '一个简洁高效的学术课程表应用',
            theme_color: '#193ce6',
            background_color: '#111421',
            display: 'standalone',
            orientation: 'portrait',
            scope: '/',
            start_url: '/',
            icons: [
              {
                src: '/icons/icon-72x72.svg',
                sizes: '72x72',
                type: 'image/svg+xml',
                purpose: 'any maskable'
              },
              {
                src: '/icons/icon-96x96.svg',
                sizes: '96x96',
                type: 'image/svg+xml',
                purpose: 'any maskable'
              },
              {
                src: '/icons/icon-128x128.svg',
                sizes: '128x128',
                type: 'image/svg+xml',
                purpose: 'any maskable'
              },
              {
                src: '/icons/icon-144x144.svg',
                sizes: '144x144',
                type: 'image/svg+xml',
                purpose: 'any maskable'
              },
              {
                src: '/icons/icon-152x152.svg',
                sizes: '152x152',
                type: 'image/svg+xml',
                purpose: 'any maskable'
              },
              {
                src: '/icons/icon-192x192.svg',
                sizes: '192x192',
                type: 'image/svg+xml',
                purpose: 'any maskable'
              },
              {
                src: '/icons/icon-384x384.svg',
                sizes: '384x384',
                type: 'image/svg+xml',
                purpose: 'any maskable'
              },
              {
                src: '/icons/icon-512x512.svg',
                sizes: '512x512',
                type: 'image/svg+xml',
                purpose: 'any maskable'
              }
            ],
            categories: ['education', 'productivity'],
            lang: 'zh-CN'
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'google-fonts-cache',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                  },
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              },
              {
                urlPattern: /^https:\/\/cdn\.tailwindcss\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'tailwind-cdn-cache',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                  },
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              }
            ]
          },
          devOptions: {
            enabled: true,
            type: 'module'
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
