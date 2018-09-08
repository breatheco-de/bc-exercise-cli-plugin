const {Command, flags} = require('@oclif/command');
let Console = require('../../utils/console');
var express = require('express');  
const bcConfig = require('../../utils/bcConfig.js');
const bcCompiler = require('../../utils/bcCompiler.js');
const fs = require('fs');
var bodyParser = require('body-parser');
class InstructionsCommand extends Command {
  async run() {
    const {flags} = this.parse(InstructionsCommand);

    var app = express();
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    
    Console.info("Loading the config...");
    var exercises = bcConfig('./');
    Console.info("Building the exercise index...");
    exercises.buildIndex();
    var config = exercises.getConfig();
    
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET,PUT");
      next();
    });
    
    app.get('/exercise', function (req, res) { 
        var config = exercises.getConfig();
        res.json(config.exercises);
    });
    
    app.get('/readme', function(req, res) {
        res.write(exercises.getReadme());
        res.end();
    });
    
    app.get('/exercise/:slug/readme', function(req, res) {
        res.write(exercises.getReadme(req.params.slug));
        res.end();
    });
    
    app.get('/exercise/:slug', function(req, res) {
        res.json(exercises.getExerciseDetails(req.params.slug));
    });
    
    app.get('/exercise/:slug/file/:fileName', function(req, res) {
        res.write(exercises.getFile(req.params.slug, req.params.fileName));
        res.end();
    });
    
    const textBodyParser = bodyParser.text();
    app.put('/exercise/:slug/file/:fileName', textBodyParser, function(req, res) {
        exercises.saveFile(req.params.slug, req.params.fileName, req.body);
        res.end();
    });
    
    app.use('/preview',express.static('dist'));
    app.use('/',express.static('_app'));
    
    server.listen( flags.port, function () {  
        Console.success("To start solving the exercises go to the following link: "+flags.host+":"+flags.port)
    });
    
    io.on('connection', function (socket) {
      Console.info("Conection with client successfully established");
      socket.emit('compiler', { action: 'log', status: 'ready', logs: ['Ready to work...'] });
      socket.on('compiler', function ({action, data}) {
        if(typeof data.exerciseSlug == 'undefined'){
          socket.emit('compiler', { action: 'log', status: 'internal-error', logs: ['No exercise slug specified'] });
          Console.error("No exercise slug especified");
          return;
        }

        socket.emit('compiler', { action: 'log', status: 'compiling', logs: ['Compiling exercise '+data.exerciseSlug] });
        const entryURL = './exercises/'+data.exerciseSlug+'/index.js';
        const comp = bcCompiler({
          socket: socket,
          config: config.compiler,
          entry: entryURL,
          publicPath: '/preview',
          address: process.env.IP,
          port: process.env.PORT
        });
        
      });
    });
  }
}

InstructionsCommand.description = `Runs a small server with all the exercise instructions`;

InstructionsCommand.flags = {
  port: flags.string({char: 'p', description: 'server port', default: '8080' }),
  host: flags.string({char: 'h', description: 'server host', default: process.env.IP || 'localhost' }),
  output: flags.boolean({char: 'o', description: 'show build output on console', default: false })
};
module.exports = InstructionsCommand;
