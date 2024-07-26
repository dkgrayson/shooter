const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/game.js',
  output: {
    filename: 'game.min.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
