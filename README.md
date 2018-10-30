bc-exercise-cli
===============

Command Line Tool for downloading, coding and runing coding exercises

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bc-exercise-cli.svg)](https://npmjs.org/package/bc-exercise-cli)

[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/alesanchezr/bc-exercise-cli?branch=master&svg=true)](https://ci.appveyor.com/project/alesanchezr/bc-exercise-cli/branch/master)
[![Codecov](https://codecov.io/gh/alesanchezr/bc-exercise-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/alesanchezr/bc-exercise-cli)
[![Downloads/week](https://img.shields.io/npm/dw/bc-exercise-cli.svg)](https://npmjs.org/package/bc-exercise-cli)
[![License](https://img.shields.io/npm/l/bc-exercise-cli.svg)](https://github.com/alesanchezr/bc-exercise-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g bc-exercise-cli
$ oclif-example COMMAND
running command...
$ oclif-example (-v|--version|version)
bc-exercise-cli/0.7.07 linux-x64 node-v8.11.4
$ oclif-example --help [COMMAND]
USAGE
  $ oclif-example COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-example run:exercises`](#oclif-example-runexercises)
* [`oclif-example run:server`](#oclif-example-runserver)
* [`oclif-example test:exercise`](#oclif-example-testexercise)

## `oclif-example run:exercises`

Runs a small server with all the exercise instructions

```
USAGE
  $ oclif-example run:exercises

OPTIONS
  -h, --host=host  [default: 0.0.0.0] server host
  -o, --output     show build output on console
  -p, --port=port  [default: 8080] server port
```

_See code: [src/commands/run/exercises.js](https://github.com/alesanchezr/bc-exercise-cli/blob/v0.7.07/src/commands/run/exercises.js)_

## `oclif-example run:server`

Runs a dummy server without any configuration

```
USAGE
  $ oclif-example run:server

OPTIONS
  -c, --compiler=compiler  compiler type: react, vanillajs, etc.
  -e, --entry=entry        entry file path for the server
  -h, --host=host          [default: 0.0.0.0] server host
  -p, --port=port          [default: 8080] server port
```

_See code: [src/commands/run/server.js](https://github.com/alesanchezr/bc-exercise-cli/blob/v0.7.07/src/commands/run/server.js)_

## `oclif-example test:exercise`

Run a particular exercise in the browser

```
USAGE
  $ oclif-example test:exercise

OPTIONS
  -n, --number=number  number of the exercise
```

_See code: [src/commands/test/exercise.js](https://github.com/alesanchezr/bc-exercise-cli/blob/v0.7.07/src/commands/test/exercise.js)_
<!-- commandsstop -->
