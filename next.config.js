const withPlugins = require('next-compose-plugins');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true'
// });

module.exports = withPlugins(
    [
        // [withBundleAnalyzer]
    ],
    {
        basePath: '/simple-h5',
        webpack: (config, options) => {
            return config;
        }
    }
);