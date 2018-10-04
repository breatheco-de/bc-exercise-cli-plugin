const path = require('path');
let shell = require('shelljs');
const fs = require('fs');
let Console = require('./console');
const jest = require('jest');

module.exports = function({ socket, testsPath, excercise }){
    
    if (!fs.existsSync(testsPath)){
      Console.error(`Test script does not exists: '${testsPath}'`);
      socket.emit('compiler', { action: 'log', status: 'internal-error', logs: [`Test script does not exists: '${testsPath}'`] });
      return;
    }
    
    var jestConfig = {
        verbose: true,
        testRegex: testsPath
    };
    
    //var spawn = require('child_process').spawn;
    //spawn('node', ['./child.js'], { shell: true, stdio: 'inherit' });
    const { stdout, stderr, code } = shell.exec(`jest --config '${JSON.stringify(jestConfig)}'`,{ silent: true });
    if(code != 0) socket.emit('compiler',{ status: 'testing-error', action: 'log', logs: [ stderr ] });
    else socket.emit('compiler',{ status: 'testing-success', action: 'log', logs: [ stderr ] });

    // jest.runCLI({ config : jestConfig }, [jestConfig.rootDir])
    //     .then(function(resp) {
    //         console.log("wele: "+resp);
    //         socket.emit('compiler',{ status: 'testing-success', action: 'log', logs: [ 'Done' ] });
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //         // var status = 'testing-success';
    //         // if(execution.code != 0) status = 'testing-error';
    //         socket.emit('compiler',{ status: 'testing-error', action: 'log', logs: [ 'Error' ] });
    //     });
};