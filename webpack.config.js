/* eslint-disable @typescript-eslint/no-var-requires */
const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const Path = require('path');
const parts = require('./webpack.parts');

const PATHS = {
  base: Path.join(__dirname),
  output: Path.join(__dirname, './dist'),
  source: Path.join(__dirname, './src'),
  fixed: ''
};

const commonConfigs = () => ({
  target: ['web', 'es5'],
  context: PATHS.source,
  output: {
    path: PATHS.output,
    publicPath: PATHS.fixed,
    filename: '[name].js'
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  entry: {
    main: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      './app/App.tsx'
    ],
    // vendor: [
    // '@babel/polyfill',
    // 'react',
    // 'react-dom',
    // 'react-redux',
    // 'redux'
    // ],
    styles: [
      './stylesheet/styles.scss'
    ]
  },
  plugins: [
    // Make process Browser
    new Webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ]
});

const baseConfigs = () => merge([
  commonConfigs(),
  parts.loadHtml(),
  parts.loadJavaScript({ exclude: /node_modules/ }),
  parts.loadOther(),
  parts.loadResolver({
    alias : {
      '@app': Path.resolve(__dirname, './src/app/'),
      '@assets': Path.resolve(__dirname, './src/assets/'),
      '@config': Path.resolve(__dirname, './src/config/'),
      '@shared': Path.resolve(__dirname, './src/app/shared/'),
      '@core': Path.resolve(__dirname, './src/app/core'),
      'react-hook-form': 'react-hook-form/dist/index.ie11'
    }
  }),
  parts.copyPlugin({
    patterns: [
      { from: 'assets', to: 'assets' },
      'robots.txt',
      'manifest.json'
    ]
  })
]);

const productionConfig = () => merge([
  parts.cleanBuild(PATHS.output),
  {
    output: {
      filename: '[name].[contenthash].js'
    }
  },
  parts.loadProdCss(),
  parts.minifyJs(),
  parts.minifyCss()
]);

const developmentConfig = () => merge([
  parts.loadDevCss({ options: { sourceMap: true }}),
  parts.devServer({
    // Customize host/port here if needed
    host: 'localhost',
    port: 3000
  })
]);

module.exports = (env) => {
  const modeConfigs = env.WEBPACK_SERVE ? developmentConfig() : productionConfig();
  return merge(
    baseConfigs(),
    parts.setEnvVariables(env.NODE_ENV || 'development'),
    modeConfigs,
    { mode: (env.WEBPACK_BUNDLE && !env.DETECT_BUILD) ? 'production' : 'development' }
  );
};
