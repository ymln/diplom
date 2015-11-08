var webpack = require('webpack');

var DEV = process.env.DEV;

module.exports = {
    entry: './javascript/app.js',
    output: {
        path: __dirname+'/static',
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
            },
            {
                test: /\.less/,
                loader: 'style!css!less'
            },

            // **IMPORTANT** This is needed so that each bootstrap js file required by
            // bootstrap-webpack has access to the jQuery object
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

            // Needed for the css-loader when bootstrap's css is loaded.
            // See https://github.com/bline/bootstrap-webpack
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: 'file' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: 'file' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file' }
        ]
    },
    plugins: DEV ? [] : [
        new webpack.optimize.UglifyJsPlugin({}),
        new webpack.DefinePlugin({
            'process.env': {
                // for React
                'NODE_ENV': '"production"'
            }
        })
    ],
    devtool: DEV ? '#cheap-module-eval-source-map' : false
}
