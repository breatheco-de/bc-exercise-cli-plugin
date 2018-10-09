const path = require('path');
let shell = require('shelljs');
const fs = require('fs');
let Console = require('./console');
const jest = require('jest');
const nodeModulesPath = path.resolve(__dirname, '../../node_modules');
const babelTransformPath = require.resolve('./config/jest/babelTransform.js');

module.exports = function({ socket, testsPath, excercise }){
    
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
    
    var jestConfig = {
        verbose: true,
        testRegex: testsPath,
        moduleDirectories: [nodeModulesPath],
        transform: {
          "^.+\\.js?$": babelTransformPath
        }
    };
    
    //var spawn = require('child_process').spawn;
    //spawn('node', ['./child.js'], { shell: true, stdio: 'inherit' });
    const command = `jest --config '${JSON.stringify(jestConfig)}' --colors`;
    Console.info('Running: '+command);
    const { stderr, code } = shell.exec(command);
    //const { stderr, code } = shell.exec(command,{ silent: true });
    if(code != 0) socket.emit('compiler',{ status: 'testing-error', action: 'log', logs: [ stderr ] });
    else socket.emit('compiler',{ status: 'testing-success', action: 'log', logs: [ stderr ] });
    
};