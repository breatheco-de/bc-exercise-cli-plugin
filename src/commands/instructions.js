const {Command, flags} = require('@oclif/command');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
let Console = require('../utils/console');
const serverConfig = require("../utils/webpack.server.js");
const fs = require('fs');

class InstructionsCommand extends Command {
  async run() {
    const {flags} = this.parse(InstructionsCommand);
    if (fs.existsSync('./bc.json')) {
      const compiler = webpack(serverConfig);
      var server = new webpackDevServer(compiler, serverConfig.devServer);
      server.listen(process.env.PORT, process.env.IP, function() {
          Console.info('Instructions have been published here http://'+process.env.IP+':'+process.env.PORT);
          Console.help('Press control + c to stop this server');
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
}
module.exports = InstructionsCommand
