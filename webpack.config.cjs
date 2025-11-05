const path = require('path');
const PugPlugin = require('pug-plugin');
const webpack = require('webpack'); // Import webpack

module.exports = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Add the HMR plugin
    new PugPlugin({
      entry: {
        // define many page templates here
        index: 'src/index.pug', // => dist/index.html
      },
      js: {
        // JS output filename
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        // CSS output filename
        filename: 'css/[name].[contenthash:8].css',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(s?css|sass)$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|png|jp?g|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext][query]',
        },
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Serve content from 'dist'
    port: 8080,
    hot: true, // Enable HMR
    open: true, // Open browser automatically
  },
};