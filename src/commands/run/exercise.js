const {Command, flags} = require('@oclif/command');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
let Console = require('../../utils/console');
const fs = require('fs');
const path = require('path');
const bcConfig = require('../../utils/bcConfig.js');
class HelloCommand extends Command {
  async run() {
    const {flags} = this.parse(HelloCommand);
    
    Console.info("Loading the config...");
    const bcExercises = bcConfig('./');
    Console.info("Building the exercise index...");
    console.log("");
    bcExercises.buildIndex(function(err, data){
      if(err) Console.error('There was an error reading the bc.json and exercises: '+err);
      
      var bcConfig = bcExercises.getConfig();
      let webpackConfig = null;
      let entryURL = null;
      if(!flags.number){
        Console.error('You need to explicity specify what exercise number');
        Console.help('For example: $ bc run:exercise -n=1');
        return;
      }
      else entryURL = './exercises/'+bcConfig.exercises[flags.number-1].slug+'/index.js';
        
      if(typeof bcConfig.exercises[flags.number-1] == 'undefined'){
        Console.error('Exercise number does not exists');
        return;
      }
      
      if(typeof bcConfig.compiler == 'undefined' || bcConfig.compiler==''){
        Console.error('The bc.json configuration is missing a compiler property');
        return;
      }
      
      const webpackConfigPath = path.resolve(__dirname,`../../utils/config/webpack.${bcConfig.compiler}.js`);
      if (!fs.existsSync(webpackConfigPath)){
        Console.error(`Uknown compiler '${bcConfig.compiler}' specified on the bc.json file`);
        return;
      }
      
      webpackConfig = require(webpackConfigPath);
      webpackConfig.entry = [
        entryURL,
        `webpack-dev-server/client?http://${process.env.IP}:${process.env.PORT}`
      ];
      const compiler = webpack(webpackConfig);
      var server = new webpackDevServer(compiler, webpackConfig.devServer);
      server.listen(flags.port, flags.host, function(err) {
          Console.success('A server has started runing your exercise here: http://'+flags.host+':'+flags.port);
          Console.info('Finishing bundle... wait...');
      });
    });
  }
}

HelloCommand.description = `Run a particular exercise in the browser`;

HelloCommand.flags = {
  number: flags.string({char: 'n', description: 'number of the exercise', default: null }),
  port: flags.string({char: 'p', description: 'server port', default: process.env.PORT || '8080' }),
  host: flags.string({char: 'h', description: 'server host', default: process.env.IP || 'localhost' })
};

module.exports = HelloCommand;
