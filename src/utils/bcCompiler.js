const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
let Console = require('./console');

module.exports = function({ config, entry, port, address, socket, publicPath }){
    socket.emit('compiler',{ action: 'clean' });
    const webpackConfigPath = path.resolve(__dirname,`./config/webpack.${config}.js`);
    
    if (!fs.existsSync(webpackConfigPath)){
      Console.error(`Uknown compiler for '${config}'`);
      return;
    }
    const webpackConfig = require(webpackConfigPath);
    webpackConfig.stats = {
        cached: false,
        cachedAssets: false,
        chunks: false,
        modules: false
    };
    webpackConfig.entry = [
      entry,
      `webpack-dev-server/client?http://${address}:${port}`
    ];
    if(typeof publicPath != 'undefined') webpackConfig.output.publicPath = publicPath;
    
    const compiler = webpack(webpackConfig);
    
    socket.emit('compiler',{ action: 'log', log: ['Compiling...'] });
    compiler.run((err, stats) => {
        if (err) {
            console.error(err);
            return;
        }
    
        const output = stats.toString({
            chunks: false,  // Makes the build much quieter
            colors: true    // Shows colors in the console
        });
        var status = 'compiler-success';
        if(stats.hasErrors()) status = 'compiler-error';
        else if(stats.hasWarnings()) status = 'compiler-warning';
        
        socket.emit('compiler',{ status, action: 'log', logs: [ output ] });
    });
}