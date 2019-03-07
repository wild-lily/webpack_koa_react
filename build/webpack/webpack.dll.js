const path = require('path')
const webpack = require('webpack')
const verdors = [
    'react',
    'react-dom',
    'react-router-dom',
    'react-router',
    'antd'
]
const libraryName = 'vendorLibrary';
module.exports = {
    entry: {
        verdor: verdors
    },
    output: {
        path: path.join(process.cwd(), 'public/assets/vendor'),
        filename: 'vendor.js',
        library: libraryName,
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(process.cwd(), 'build/manifest/manifest.json'),
            name: libraryName,
            context: path.join(process.cwd(), 'build/manifest'),
        })
    ]
}