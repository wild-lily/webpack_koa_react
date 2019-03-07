const path = require('path')
const webpack = require('webpack');
const webpackConfig = {
    entry: [
        'webpack/hot/only-dev-server',
        'webpack-hot-middleware/client',
        path.join(process.cwd(), 'src/client/main.js'),
    ],
    devtool: 'eval-source-map',
    output: {
        path: path.join(process.cwd(), 'public/assets'),
        filename: 'main.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(scss|sass)?$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: path.join(process.cwd(), 'build/manifest'),
            manifest: require('../manifest/manifest.json'),
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
export default webpackConfig;