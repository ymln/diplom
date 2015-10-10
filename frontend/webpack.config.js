var webpack = require('webpack');

var DEV = process.env.DEV;

module.exports = {
    entry: './javascript/app.jsx',
    output: {
        path: __dirname+'/../src/main/resources',
        filename: 'all.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    optional: ['runtime'],
                    stage: 0
                }
            }
        ]
    },
    plugins: DEV ? [] : [
        new webpack.optimize.UglifyJsPlugin({}),
    ],
    devtool: "#source-map"
}
