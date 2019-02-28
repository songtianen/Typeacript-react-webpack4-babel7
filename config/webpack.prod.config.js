const path = require("path");
const webpack = require('webpack')
const merge = require("webpack-merge");
// const PurifyCSS = require("purifycss-webpack");
// const glob = require("glob-all");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseWebpackConfig = require("./webpack.base.config");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const antdTheme = require('../theme')
const ROOTPATH = path.resolve(__dirname)

const webpackProdConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[hash].bundle.js',
    publicPath: '',

  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true
            }
          },
          {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.(less|css)$/,
        // exclude: "/node_modules|antd\.css/",
        use: [
          // {
          //   loader: 'style-loader'
          // },
          {
            loader: MiniCssExtractPlugin.loader
           },
          { 
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 15 versions']
                }),
                // require('postcss-import')(),
                // require('stylelint')(),
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: antdTheme,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'assets/fonts/'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: { // 通过options 配置路径
              name: '[name].[ext]',
              limit: 8192,
              outputPath: 'assets/imgs/'
            }
          },
          {
            loader: 'img-loader', // 图片压缩
            options: {
              pngquant: {
                quality: 80
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin(['dist'],
      {
        root: path.join(ROOTPATH, '../'),
        // exclude: ['shared.js'],
        verbose: true,
      }),
    new webpack.DefinePlugin({
      "process.env": require("./prod.env")
    }),
    // new PurifyCSS({
    //   paths: glob.sync([
    //     // 要做CSS Tree Shaking的路径文件
    //     path.join(ROOTPATH, "../*.html"),
    //     // path.join(ROOTPATH, "../src/*.js")
    //   ])
    // }),
  
  ]
});


module.exports = webpackProdConfig;