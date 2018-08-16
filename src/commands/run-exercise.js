const {Command, flags} = require('@oclif/command');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
let Console = require('../utils/console');
const fs = require('fs');
const path = require('path');

class HelloCommand extends Command {
  async run() {
    const {flags} = this.parse(HelloCommand);
    if (fs.existsSync('./bc.json')) {
      let webpackConfig = null;
      
      if(!flags.number){
        Console.error('You need to explicity specify what exercise number');
        Console.help('For example: $ bc run-exercise -n=1');
        return;
      }
        
      var bcConfig = JSON.parse(fs.readFileSync('./bc.json', 'utf8'));
      if(typeof bcConfig.exercises[flags.number-1] == 'undefined'){
        Console.error('Exercise number does not exists');
        return;
      }
      
      if(typeof bcConfig.compiler == 'undefined' || bcConfig.compiler==''){
        Console.error('The bc.json configuration is missing a compiler property');
        return;
      }
      
      const webpackConfigPath = path.resolve(__dirname,`../utils/config/webpack.${bcConfig.compiler}.js`);
      if (!fs.existsSync(webpackConfigPath)){
        Console.error(`Uknown compiler '${bcConfig.compiler}' specified on the bc.json file`);
        return;
      }
      
      webpackConfig = require(webpackConfigPath);
      webpackConfig.entry = [
        './exercises/'+bcConfig.exercises[flags.number-1].slug+'/index.js',
        `webpack-dev-server/client?http://${process.env.IP}:${process.env.PORT}`
      ];
      const compiler = webpack(webpackConfig);
      var server = new webpackDevServer(compiler, webpackConfig.devServer);
      server.listen(flags.port, flags.host, function(err) {
          Console.success('A server has started runing your exercise here: http://'+flags.host+':'+flags.port);
          Console.info('Finishing bundle... wait...');
      });
    }
    else{
      this.error('No bc.json file found');
    }
  }
}

HelloCommand.description = `Run a particular exercise in the browser`;

HelloCommand.flags = {
  number: flags.string({char: 'n', description: 'number of the exercise', default: null }),
  port: flags.string({char: 'p', description: 'server port', default: process.env.PORT || '8080' }),
  host: flags.string({char: 'h', description: 'server host', default: process.env.IP || 'localhost' })
};

module.exports = HelloCommand;
