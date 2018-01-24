const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    cache: true,
    entry: ['babel-polyfill','./src/index.js'],
    output: {
        filename: '[name].bundle.[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        extensions: [
            '.less',
            '.js'
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/index.html'
        }),
        new CopyWebpackPlugin ([
            { from: 'src/images', to: 'images' }
        ]),
        new BrowserSyncPlugin({
                open: false,
                notify: false,
                port: 9000,
                proxy: 'http://localhost:8080/'
            },
            {
                reload: false
            }),
        new ExtractTextPlugin("styles.css")
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: path.resolve()
            },
            process.env.NODE_ENV === 'production' ?
                {
                    test: /\.less/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: 'css-loader?{minimize: true}!less-loader'
                    })
                }
                :
                {
                    test: /\.less/,
                    loader: 'style-loader!css-loader!less-loader'
                },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "./images/[name].[ext]"
                    }
                }
            }
        ]
    }
};