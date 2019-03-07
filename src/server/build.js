import debug from 'debug';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { koaDevMiddleware, koaHotMiddleware } from 'koa-webpack-middleware-zm';
import webpackConfig from '../../build/webpack/webpack.config';
import ProgressBar from './progressBar';

const PORT = 7788;

const build = (app) => {
    debug('webpack')('start compile');

    const pb = new ProgressBar('compiling', 50);
    const compile = webpack(webpackConfig);

    compile.apply(new webpack.ProgressPlugin((percentage) => {
        pb.render({ completed: Math.floor(percentage * 100), total: 100 });
        if (percentage === 1) {
            debug('webpack')('compile success');
            debug('app')(`server running on ${PORT}`);
        }
    }));
    const hotMiddleware = webpackHotMiddleware(compile, { noInfo: true, log: false })
    const devMiddleware = webpackDevMiddleware(compile, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        watchOptions: {
            ignored: /node_modules/,
        },
    });
    app.use(koaDevMiddleware(devMiddleware));
    app.use(koaHotMiddleware(hotMiddleware));
};

export default build;
