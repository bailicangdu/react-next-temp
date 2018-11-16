const withLess = require('@zeit/next-less');
const withTypescript = require('@zeit/next-typescript');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ANALYZE, NODE_ENV } = process.env;

let serverRuntimeConfig;

if (NODE_ENV !== 'production') {
  serverRuntimeConfig = {
    apiHost: 'http://elm.cangdu.org',
  }
} else {
  serverRuntimeConfig = {
    apiHost: 'http://127.0.0.1:8001',
  }
}

module.exports = withTypescript(withLess({
  webpack (config, { buildId, dev, isServer, defaultLoaders }) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          publicPath: './',
          outputPath: 'static/',
          name: '[name].[ext]'
        }
      }
    });
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
    return config;
  },
  webpackDevMiddleware (config){
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  // Will only be available on the server side
  serverRuntimeConfig,
  // Will be available on both server and client
  publicRuntimeConfig: {
    apiHost: 'http://elm.cangdu.org',
  },
  // distDir: 'ssr',
}))


