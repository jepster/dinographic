const path = require('path');
const fs = require('fs');

module.exports = {
  entry: ['babel-polyfill', './app.js'],
  output: {
    path: path.join(__dirname, '/webpack-dist/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            ...JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc'))),
          }
        }]
      }
    ]
  },
  devtool: 'none'
};
