#! /usr/bin/env node

// Imports
// Thrid party
const program = require('commander')

// Source imports
const TaskRunner = require('./TaskRunner')
// const pipeRunner = require('./pipeRunner')

// Reading from src files
const packageJson = require('./package.json')

// parsing process arguments
program.version(packageJson.version, '-v, --version')

program.command('clean')
  .description('clean the auto generated files')
  .action(() => {
    TaskRunner.clean()
  })

program.command('run')
  .description('create test environment based on arguments or config files')
  .option('-u, --unit-test-pattern', 'The unit test specs file pattern', 'tests/unit/**/*.test.js')
  .option('-f, --functional-test-pattern', 'The functional test specs file pattern', 'tests/functional/**/*.test.js')
  .option('-c, --conf-path', 'Test config file', 'test.conf.js')
  // .option('-P, --pineapple', 'Add pineapple')
  // .option('-b, --bbq-sauce', 'Add bbq sauce')
  // .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .action(options => {
    run(options) 
  })

program.parse(process.argv);

// Clean file structure

// Read templates
// createUnitTests()

// Main workflow
function run (options) {
  let taskRunner = new TaskRunner({
    options
  })
  
  // pipeRunner.c
  // .pipe(
  //   clean, 
  //   createTestConf, 
  //   createUnitTests, 
  //   addUnitTestDependencies, 
  //   final)
  
  taskRunner
    .clean()
    .createTestConf()
    .createUnitTests()
    .addUnitTestScripts()
    .final()
}