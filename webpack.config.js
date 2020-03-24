const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const outputPath = path.resolve(__dirname, 'dist')
console.log({outputPath})
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output:{
        filename: 'main.js',
        path: outputPath
    },
    module: {
      rules: [
        //jsxとjsが対象
        { test: /\.jsx?$/,//jsxとjsが対象 
          //node_modules除外
          exclude: /node_modules/, 
          loader: "babel-loader" 
        },
        //cssとscssの設定をまとめる
        {
          test:/\.(sc|c)ss$/,
          use:[
            //順番重要
            MiniCssExtractPlugin.loader,
            //cssを読み取る
            'css-loader',
            //scssファイルをコンパイル
            'sass-loader'
          ]
        },
        { 
          test:/\.(jpe?g|png|gif|svg|ico)$/i,
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: './images/[name].[ext]'
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        }
      ]
    },
    devServer: {
      contentBase: outputPath
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css'
      })
    ],
    optimization: {
      minimizer: [new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })],
    },
}
