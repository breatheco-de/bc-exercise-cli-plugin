const {Command, flags} = require('@oclif/command');
let shell = require('shelljs');
let fs = require('fs');
const webpack = require('webpack');
const reactConfig = require("../utils/webpack.react.js");
let Console = require('../utils/console');

class HelloCommand extends Command {
  async run() {
    const {flags} = this.parse(HelloCommand);
    if (fs.existsSync('./bc.json')) {
//npm run compile && mocha -b --compilers js:babel/register --require test/helpers.js test/**/*.js || echo
      if(flags.number){
        //if(shell.which('jest') && shell.which('babel-cli')){
          reactConfig.output.filename = flags.number + '.bundle.js';
          reactConfig.devtool = false;
          reactConfig.output.path = process.cwd() + '/compiled';
          reactConfig.entry = './exercises/'+flags.number+'/index.js';
          const compiler = webpack(reactConfig);
          compiler.run((err, stats) => {
            if (err || stats.hasErrors()) {
              console.log(stats.toString({
                colors: true
              }));
              Console.error("There was an error compiling, review above");
              return;
            }
            Console.success("Your code compiled successfully");
          });
        // }
        // else{
        //   Console.error('Please install jest globally to test your exercises');
        //   Console.help('$ npm i jest babel-cli -g');
        // }
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
