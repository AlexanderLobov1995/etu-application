const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');


module.exports = {

  entry: {
    app: './app/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {extensions: ['.js', '.ts']},
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {loader: 'awesome-typescript-loader'},
          {loader: 'angular2-template-loader'}
        ]
      },
      {
        test: /\.html/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg|ico|woff)$/,
        loader: 'file-loader'
      },
      {
        test: /\.styl$/,
        include: [path.resolve(__dirname, 'app')],
        use: ['to-string-loader', 'style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.resolve(__dirname, 'app'), {}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, 'node_modules')
          ) === 0
        )}
    }),
    new HtmlPlugin({template: './index.html'})
  ]
};
