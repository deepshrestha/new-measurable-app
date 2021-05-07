const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require("babel-polyfill");  // For async await funtion
module.exports = {
    mode: "development",
    //entry: './src/index.js',
    entry: ['babel-polyfill','./src/index.js'], // For async await
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: './public/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: 'public/dist/**', to: 'assets'
                }
            ]
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed)
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8081,
        historyApiFallback: true
    },
    devtool: 'inline-source-map'
};