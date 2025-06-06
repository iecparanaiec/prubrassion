import webpack from 'webpack';
import middleware from 'webpack-dev-middleware'
import hot from 'webpack-hot-middleware';


export default (app) => {
    const config = require('../../../webpack.config');
    const compiler = webpack(config)
    
    app.use(middleware(compiler, {
        publicPath: config[0].output.publicPath,
        serverSideRender: true,
    }))

    app.use(
        hot(compiler, {
            path: '/__webpack_hmr',
            heartbeat: 10 * 1000,
        }),
    );
}