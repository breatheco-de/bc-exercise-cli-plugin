const {Command, flags} = require('@oclif/command');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const reactConfig = require("../utils/webpack.react.js");
let Console = require('../utils/console');
const fs = require('fs');
const path = require('path');

class HelloCommand extends Command {
  async run() {
    const {flags} = this.parse(HelloCommand);
    if (fs.existsSync('./bc.json')) {
      let config = null;
      if(flags.number){
        var bcConfig = JSON.parse(fs.readFileSync('./bc.json', 'utf8'));
        if(typeof bcConfig.exercises[flags.number-1] == 'undefined'){
          Console.error('Exercise does not exists');
          return;
        }
        console.log(reactConfig.resolveLoader);
        reactConfig.entry = './exercises/'+bcConfig.exercises[flags.number-1].slug+'/index.js';
        config = reactConfig;
        const compiler = webpack(config);
        var server = new webpackDevServer(compiler, config.devServer);
        server.listen(process.env.PORT, process.env.IP, function() {
            Console.success('A server has started runing your exercise here: http://'+process.env.IP+':'+process.env.PORT);
            Console.info('Finishing bundle... wait...');
        });
      }
      else{
        Console.error('You need to explicity specify what exercise number');
        Console.help('For example: $ bc run-exercise -n=1');
      }
    }
    else{
      this.error('No bc.json file found');
    }
  }
}

HelloCommand.description = `Run a particular exercise in the browser`

HelloCommand.flags = {
  number: flags.string({char: 'n', description: 'number of the exercise', default: null }),
}

module.exports = HelloCommand
