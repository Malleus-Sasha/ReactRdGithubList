 const path = require('path');
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 const HTMLWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
    mode: 'development',
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        // publickPath: '/',
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
        new HTMLWebpackPlugin({template: './src/index.html'}),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
          {
              test: /\.(css|less)$/,
              use: ["style-loader", "css-loader", "less-loader"],
              exclude: /node_modules/,
          },
          {
              test: /\.(jpg|jpeg|png|svg)/,
              use: ['file-loader'],
              exclude: /node_modules/,
          },
          {
            // TODO m? 
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-react', '@babel/preset-env']
              }
            }
          }
        ]
    }
 }