var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

console.log('Node Modules: '+ JSON.stringify(nodeModules));

module.exports = {
    name: 'server',
    target: 'node',    
    entry: {
        server: './src/server.ts'
    },
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: './dist/[name].js' // Output for the multiple entry
    },
    externals: nodeModules,    
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension. 
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.ts', '.tsx']
    },
    module: { // An array of extensions that should be used to resolve modules.
        loaders: [{
            // test: A condition that must be met <-> exclude
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    ts: { // set compiler which is used by ts-loader
        compiler: 'typescript'
    },
    node: {
        console: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};