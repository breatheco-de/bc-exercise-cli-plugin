<p align="center">
  <img src="https://assets.breatheco.de/apis/img/images.php?blob&random&cat=icon&tags=breathecode,128">
</p>

<p>
    <h2 align="center"> Exercise Engine for teaching code (Like CodeCademy.com but free) </h2>
</p>

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bc-exercise-cli.svg)](https://npmjs.org/package/bc-exercise-cli)

[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/alesanchezr/bc-exercise-cli?branch=master&svg=true)](https://ci.appveyor.com/project/alesanchezr/bc-exercise-cli/branch/master)
[![Codecov](https://codecov.io/gh/alesanchezr/bc-exercise-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/alesanchezr/bc-exercise-cli)
[![Downloads/week](https://img.shields.io/npm/dw/bc-exercise-cli.svg)](https://npmjs.org/package/bc-exercise-cli)
[![License](https://img.shields.io/npm/l/bc-exercise-cli.svg)](https://github.com/alesanchezr/bc-exercise-cli/blob/master/package.json)

This is the command line application that is being used as exercises engine for the breathecode platform, it is being used in different projects like [4Geeks Academy React Exercises](https://github.com/4GeeksAcademy/react-exercises).

The whole idea of the project is that teachers can create autograded exercises really fast an simple, in any technology and without the nead of any website 3rd party server.

### For students, it is as simple as typing in the terminal:
```
$ bc run:exercises
```
And the BreatheCode CLI will start a local server with all instructions and a coding editor for the solutions like this:

<p align="center">
  <img width="400px" src="https://raw.githubusercontent.com/breatheco-de/bc-exercise-cli-plugin/master/preview.gif">
</p>

### For teachers, it is really simple to create exercises

You can follow these steps:
1. Create your project folder anywhere in your computer and name it however you want.
2. Get inside that project folder and create a new folder for each exercise that you would like your students to complete.
3. Inside each exercise folder you cna ahve 3 files:
  - README.md with the instructions of the exercise.
  - index.js: this will be the default content that student will se on the exercise, they should update this file to complete the exercise. You can add a boilerplate and also some comments to help students.
  - tests.js: Here is where you auto-grade the exercises, you have to create a testing scrip using the [jest library](https://jestjs.io/). More testing libraries will be added later for other languages.
