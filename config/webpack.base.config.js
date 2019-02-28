const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const ROOTPATH = path.resolve(__dirname)
const isProd = process.env.NODE_ENV === "production";

const baseWebpackConfig = {
  mode: isProd ? 'production' : 'development',
  entry:{
    app: path.join(ROOTPATH, "../src/index")
  },
  output: {
    path: path.join(ROOTPATH, "../dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },

  // mode为production自动启用
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          comments: false,
          ecma: 6,
          cache: true,
          parallel: true
        }
      }),
      // 压缩css
      new OptimizeCSSAssetsPlugin(
        // {
        // cssProcessorOptions: {
        //   map: { inline: false }
        // }
        // }
      )
    ],
    runtimeChunk: true,
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      cacheGroups: {
        // styles: {
        //   name: 'styles',
        //   test: /\.less$/,
        //   chunks: 'all',
        //   enforce: true
        // },
        vendor: {
          test: function (module) {
            // 阻止.css文件资源打包到vendor chunk中
            if (module.resource && /\.css$/.test(module.resource)) {
              return false;
            }
            // node_modules目录下的模块打包到vendor chunk中
            return module.context && module.context.includes("node_modules");
          },
          chunks: 'all',
          name: 'vendor',
          priority: 10, // 优先
          enforce: true
        }
      }
    }
  },
  plugins: [
    // 由于mac不区分大小写，linux区分大小写，可能导致mac上正常，在部署时出错，所以强制区分大小写
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(ROOTPATH, '../src/index.html'),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      tsconfig: path.join(ROOTPATH, "../tsconfig.json"),
      tslint: path.join(ROOTPATH, "../tslint.json"),
      reportFiles: ['../src/**/*.{ts,tsx}', '!../src/skip.ts']
    }),
    
  ]
}

module.exports = baseWebpackConfig;