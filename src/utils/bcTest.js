const path = require('path');
let shell = require('shelljs');
const fs = require('fs');
let Console = require('./console');

module.exports = function({ socket, testsPath, excercise, config }){
    
    if (!shell.which('jest')) {
      Console.fatal('You need to have jest installed to run test the exercises');
      Console.help('Please run $ npm i jest -g');
      socket.emit('compiler', { action: 'log', status: 'internal-error', logs: [`You need to have jest installed to run test the exercises, please run $ npm i jest -g`] });
      shell.exit(1);
      return;
    }
    
    if (!fs.existsSync(testsPath)){
      Console.error(`Test script does not exists: '${testsPath}'`);
      socket.emit('compiler', { action: 'log', status: 'internal-error', logs: [`Test script does not exists: '${testsPath}'`] });
      return;
    }
    
    const webpackConfigPath = path.resolve(__dirname,`./config/jest/${config.compiler}.config.js`);
    if (!fs.existsSync(webpackConfigPath)){
      Console.error(`Uknown compiler: '${config.compiler}'`);
      socket.emit('compiler', { action: 'log', status: 'internal-error', logs: [`Uknown compiler: '${config.compiler}'`] });
      return;
    }
    
    var jestConfig = require(webpackConfigPath);
    jestConfig.testRegex = testsPath; //path to the tests
    
    //var spawn = require('child_process').spawn;
    //spawn('node', ['./child.js'], { shell: true, stdio: 'inherit' });
    const command = `jest --config '${JSON.stringify(jestConfig)}' --colors`;
    Console.info('Running: '+command);
    const { stderr, code } = shell.exec(command);
    //const { stderr, code } = shell.exec(command,{ silent: true });
    if(code != 0) socket.emit('compiler',{ status: 'testing-error', action: 'log', logs: [ stderr ] });
    else socket.emit('compiler',{ status: 'testing-success', action: 'log', logs: [ stderr ] });
    
};