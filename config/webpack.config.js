var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/es5.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'svg-3d-builder.min.js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader',
                options: {
                    presets: ['stage-0', 'env']
                },
            }
        ]
    },
    devtool: "source-map"
}