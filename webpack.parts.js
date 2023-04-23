/* eslint-disable @typescript-eslint/no-var-requires */
const Webpack = require('webpack');
const Path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dotenv = require('dotenv');
const fs = require('fs');

exports.setEnvVariables = (mode = '') => {
  const envDefault = `${Path.join(__dirname)}/.env`;
  let envPath = `${envDefault}.${mode}`;
  if (!fs.existsSync(envPath)) {
    envPath = envDefault;
  }
  const envParsed = dotenv.config({ path: envPath }).parsed;
  const envKeys = Object.keys(envParsed).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envParsed[next]);
    return prev;
  }, {});

  return {
    plugins: [
      new Webpack.EnvironmentPlugin(Object.keys(envParsed).map(key => key)),
      new Webpack.DefinePlugin(envKeys)
    ]
  };
};

exports.loadHtml = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        include,
        exclude,
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    })
  ]
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include,
        exclude,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
});

exports.loadDevCss = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        include,
        exclude,
        type: 'javascript/auto',
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          'sass-loader'
        ]
      }
    ]
  }
});

exports.loadProdCss = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        include,
        exclude,
        use: [
          // 'style-loader', // Fallback
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  }
});

exports.loadOther = () => ({
  module: {
    rules: [
      {
        test: /\.png$/,
        // type: 'asset/resource',
        use: {
          loader: 'url-loader',
          options: { limit: 100000 }
        }
      },
      { test: /\.jpg$/, use: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: ['@svgr/webpack'] },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: { mimetype: 'application/font-woff' }
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: { mimetype: 'application/octet-stream' }
        }
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' }
    ]
  }
});

exports.loadResolver = ({ alias } = {}) => ({
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js'],
    mainFields: ['browser', 'main'],
    alias,
    fallback: {
      assert: require.resolve('assert/'),
      buffer: require.resolve('buffer-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      vm: require.resolve('vm-browserify')
    }
  }
});

exports.copyPlugin = ({ patterns } = {}) => ({
  plugins: [
    new CopyWebpackPlugin({
      patterns
    })
  ]
});

exports.minifyJs = () => ({
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false,
      terserOptions: {
        output: {
          comments: false
        }
      }
    })]
  }
});

exports.minifyCss = () => ({
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ]
});

exports.cleanBuild = (path) => ({
  plugins: [
    new CleanWebpackPlugin()
  ]
});

exports.devServer = ({ host, port } = {}) => ({
  devtool: 'source-map',
  devServer: {
    // contentBase: Path.join(__dirname, './src'),
    hot: true,
    host,
    port,
    compress: true,
    historyApiFallback: true
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    runtimeChunk: 'single'
  },
});
