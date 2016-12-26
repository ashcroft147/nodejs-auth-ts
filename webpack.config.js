var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        bundle: './src/server.ts'
    },
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: './dist/[name].js' // Output for the multiple entry
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension. 
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.ts', '.tsx']
    }, 
    module: { // An array of extensions that should be used to resolve modules.
        loaders: [
            {
                // test: A condition that must be met <-> exclude
                test: /\.tsx?$/,
                exclude: /node_modules/,  
                loader: 'ts-loader'
            }
        ]
    },
    ts : { // set compiler which is used by ts-loader
        compiler : 'typescript'
    }
};