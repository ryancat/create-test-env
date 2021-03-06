#! /usr/bin/env node

// Imports
// Thrid party
const program = require('commander')

// Source imports
const AsyncTaskRunner = require('./AsyncTaskRunner')
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
  .option('-s, --unit-test-spec', 'The unit test specs file pattern', 'tests/unit/**/*.test.js')
  // .option('-f, --functional-test-spec', 'The functional test specs file pattern', 'tests/functional/**/*.test.js')
  .option('-u, --url', 'The url where your app runs')
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
  let asyncTaskRunner = new AsyncTaskRunner({
    options
  })
  
  asyncTaskRunner
    .pipe('clean')
    // .pipe('createTestConf')
    // .pipe('createUnitTestSpecs')
    // .pipe('createFunctionalTestSpecs')
    .pipe('addUnitTestConfigInPackageJson')
    .pipe('addFunctionalTestConfigInPackageJson')
    .pipe('addFunctionalTestConfig')
    .pipe('final')
}