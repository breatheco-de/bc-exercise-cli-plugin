const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const highlight = require('rehype-highlight');
const nodeModulesPath = path.resolve(__dirname, '../../../node_modules');
module.exports = {
  mode: "development",
  entry: './index.js',
  output: {filename: 'bundle.js'},
  module: {
    rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  nodeModulesPath+'/babel-preset-env',
                  nodeModulesPath+'/babel-preset-react'
                ],
                plugins:[
                  require(nodeModulesPath+'/babel-plugin-syntax-dynamic-import'),
                ]
              }
            }
          ]
        },
        { test: /\.md$/, use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  nodeModulesPath+'/babel-preset-env',
                  nodeModulesPath+'/babel-preset-react'
                ]
              }
            },
            {
              loader: '@hugmanrique/react-markdown-loader',
              options: {
                rehypePlugins: [
                  highlight
                ]
              }
            }
          ]
        },
        {
          test: /\.(scss|css)$/, use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }]
        }, //css only files
        { 
          test: /\.(png|svg|jpg|gif)$/, use: {
            loader: 'file-loader',
            options: { name: '[name].[ext]' } 
          }
        }, //for images
        { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, use: ['file-loader'] } //for fonts
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [nodeModulesPath]
  },
  resolveLoader: {
    modules: [nodeModulesPath]
  },
  devtool: "source-map",
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
        favicon: path.resolve(__dirname,'../favicon.png'),
        template: path.resolve(__dirname,'../template.html')
    })
  ]
};
