const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    library: 'fluidpay-js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    filename: 'fluidpay.js',
    path: path.resolve(__dirname, 'dist')
  }
}