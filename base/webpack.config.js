const TerserPlugin = require('terser-webpack-plugin');

// TODO: Look into this

module.exports = {
    entry: './src/mod.ts',
    output: {
        filename: 'dist/pheasant_routing.min.js',
        libraryTarget: 'umd', 
        library: 'Pheasant-Routing',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
}