const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');

module.exports = webpackMerge(commonConfig, {
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i
        }),
        new CompressionPlugin({
            cache: true,
            asset: '[path].gz[query]',
            algorithm: 'gzip'
        })
    ]
});