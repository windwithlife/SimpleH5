const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);

const { withPlugins , optional } = require('next-compose-plugins');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = withPlugins(
    [
        [optional(() => require('@next/bundle-analyzer')({
            enabled: process.env.ANALYZE === 'true'
        })), [PHASE_DEVELOPMENT_SERVER]]
    ],
    {
        basePath: '/simple-h5',
        webpack: (config, options) => {
            config.module.rules.push({
                resolve: {
                    alias: {
                        '@styles': resolve('./styles'),
                        '@components': resolve('./components'),
                        '@utils': resolve('./utils')
                    }
                },
            })
            return config;
        }
    }
);