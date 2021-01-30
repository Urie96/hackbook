const { generateSW } = require('workbox-build');

const swDest = './dist/service-worker.js'

generateSW({
    // mode: 'development',
    swDest,
    globDirectory: './dist/',
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    skipWaiting: true,
    sourcemap: false,
    dontCacheBustURLsMatching: /\.\w{8}\.[^.]*$/,
    globPatterns: ['**\/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,eot,ttf,otf}'],
    navigateFallback: '/index.html',
    runtimeCaching: [
        {
            urlPattern: /https:\/\/(cdn|at)/,
            handler: 'CacheFirst',
            options: {
                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        }
    ]
}).then(({ count, size }) => {
    console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});