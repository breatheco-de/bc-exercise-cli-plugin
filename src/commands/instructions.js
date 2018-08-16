const {Command, flags} = require('@oclif/command');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
let Console = require('../utils/console');
const serverConfig = require("../utils/config/webpack.server.js");
const fs = require('fs');
class InstructionsCommand extends Command {
  async run() {
    const {flags} = this.parse(InstructionsCommand);
    if (fs.existsSync('./bc.json')) {
      const compiler = webpack(serverConfig);
      var server = new webpackDevServer(compiler, serverConfig.devServer);
      server.listen(flags.port, flags.host, function() {
          Console.info('Instructions have been published here http://'+flags.host+':'+flags.port);
          Console.help(`What to do next?
-----------
You should open a new terminal to run the first exercise by doing: 
$ bc run-exercise -n=1

You can leave this server runing in order to keep reading the instructions as you do the exercises

Press control + c to stop this server whenever you want`);
      });
    }
    else{
      Console.error('No bc.json file found');
      Console.help('Make sure there is a bc.json file on your current directory');
    }
  }
}

InstructionsCommand.description = `Runs a small server with all the exercise instructions`

InstructionsCommand.flags = {
  port: flags.string({char: 'p', description: 'server port', default: '8081' }),
  host: flags.string({char: 'h', description: 'server host', default: process.env.IP || 'localhost' }),
}
module.exports = InstructionsCommand
