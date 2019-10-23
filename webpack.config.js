const path = require('path')

const outputPath = path.resolve(__dirname, 'dist')
console.log({outputPath})

module.exports = {
    entry: './src/index.js',
    output:{
        filename: 'main.js',
        path: outputPath
    },
    module: {
      rules: [
        {
          test:/\.css$/,
          use:[
            'style-loader',
            'css-loader',
          ]
        },
        {
          test:/\.scss$/,
          use:[
            //順番重要
            // styleに埋め込む
            'style-loader',
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
        }
      ]
    },
    devServer: {
      contentBase: outputPath
    }
}
