const {Command, flags} = require('@oclif/command');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
let Console = require('../../utils/console');
const serverConfig = require("../../utils/config/webpack.server.js");
const bcConfig = require('../../utils/bcConfig.js');

class InstructionsCommand extends Command {
  async run() {
    const {flags} = this.parse(InstructionsCommand);

    Console.info("Loading the config...");
    let bcExercises = bcConfig('./');
    
    Console.info("Building the exercise index...");
    console.log("");
    bcExercises.buildIndex(function(err, data){
      if (err) return Console.error('There was an error reading the bc.json and exercises.');
      const compiler = webpack(serverConfig);
      serverConfig.devServer.quiet = !flags.output;
      var server = new webpackDevServer(compiler, serverConfig.devServer);
      server.listen(flags.port, flags.host, function() {
        Console.info('Instructions have been published here http://'+flags.host+':'+flags.port);
        Console.help(`What to do next?
  -----------
  Open the website and read the instructions carefully for the first exercise.
  
  Then, open the index.js file of the first exercise and see it live by doing: 
  $ bc run:exercise -n=1
  
  Press control + c to stop this instructions server any time.`);
        // TODO: Video about how to do the exercises
        //Console.help('Here is a small explanatory video: ');  
      });
    });
  }
}

InstructionsCommand.description = `Runs a small server with all the exercise instructions`;

InstructionsCommand.flags = {
  port: flags.string({char: 'p', description: 'server port', default: '8081' }),
  host: flags.string({char: 'h', description: 'server host', default: process.env.IP || 'localhost' }),
  output: flags.boolean({char: 'o', description: 'show build output on console', default: false })
};
module.exports = InstructionsCommand;
