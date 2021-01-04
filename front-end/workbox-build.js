const { generateSW } = require('workbox-build');

const swDest = './dist/sw.js'

generateSW({
    // mode: 'development',
    swDest,
    globDirectory: './dist/',
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    skipWaiting: true,
    sourcemap: false,
    dontCacheBustURLsMatching: /\.\w{8}\.[^.]*$/,
    globPatterns: ['**.{js,css,html,svg,json}', '**/**.{js,css}'],
    runtimeCaching: [
        {
            urlPattern: /https:\/\/(cdn)/,
            handler: 'CacheFirst',
            options: {
                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        },
        {
            urlPattern: /https?:\/\/[^/]+\/api\/courses/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheableResponse: {
                    statuses: [200]
                }
            }
        }
    ]
}).then(({ count, size }) => {
    console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});