#! /usr/bin/env node

// Imports
const fs = require('fs')
const shell = require('shelljs')
const program = require('commander')

// Reading from src files
const packageJson = JSON.parse(fs.readFileSync('package.json'))

// parsing process arguments
program
  .version(packageJson.version)
  .option('-u, --unit-test-pattern', 'The unit test specs file pattern', 'tests/unit/**/*.test.js')
  .option('-f, --functional-test-pattern', 'The functional test specs file pattern', 'tests/functional/**/*.test.js')
  .option('-c, --config', 'Test config file', 'test.conf.js')
  // .option('-P, --pineapple', 'Add pineapple')
  // .option('-b, --bbq-sauce', 'Add bbq sauce')
  // .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

// Read from argument

// Create file structure
const createUnitTests = () => {
  // Test if test directory exists
  if (!shell.test('-e', unitTestDir)) {
    shell.mkdir('-p', unitTestDir);
  }

  shell.mkdir('unit-tests')
  fs.writeFileSync('unit-tests/template.test.js', fs.readFileSync('templates/unit.test.js'))
}


// Clean file structure

// Read templates
createUnitTests()