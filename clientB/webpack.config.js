//конфиг для запаковки модуля в 1 файл

var webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: "./dist/src/index.js",
    output: {
        path: __dirname,
        filename: 'clientB.js'
        ,libraryTarget: 'commonjs'
    },
    node: {
        __dirname: false,
        __filename: false,
    }
    ,target: 'node'
    ,externals: [  ]
};