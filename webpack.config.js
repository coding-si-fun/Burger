const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssExtractorPlugin = require('mini-css-extract-plugin');

// ..
var path = require('path');

module.exports = {
    entry:"./src/index.tsx",
    devtool:'eval-source-map',
    // ..
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/',
    },

    resolve:{
        extensions:['.js', '.ts', '.tsx'],
    },
    module:{
        rules:[{
            test:/\.tsx?$/,
            loader:'babel-loader',
            exclude:/mode_modules/,
        },
        {
            test:/\.css$/,
            use:[ MiniCssExtractorPlugin.loader, {loader:'css-loader', options:{ modules:true }}]
           
        },
        {
            test: /\.(png|jpg|gif)$/i,
           dependency: { not: ['url'] },
            use: [
              {
                loader: 'file-loader',
                options: {
                  limit: 8192,
                },
              },
            ],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
      },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin(),
    ],
};