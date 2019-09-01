//конфиг для запаковки модуля в 1 файл
var webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: {
        clientA: "./dist/src/clientA/index.js",
        clientB: "./dist/src/clientB/index.js"
    },
    output: {
        path: __dirname,
        filename: "[name].js",
        libraryTarget: 'commonjs'
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    target: 'node',
    externals: []
};
