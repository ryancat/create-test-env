// Nodejs imports
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process');

// Thrid party
const shell = require('shelljs')
// TODO: make my simple-deep-equal as good as deep-equal
const deepEqual = require('simple-deep-equal').deepEqual

// Source imports
const util = require('./util')

class TaskRunner {

  constructor (props = {}) {
    this.log = shell.test('-f', TaskRunner.TASK_LOG_PATH) 
      ? JSON.parse(fs.readFileSync(TaskRunner.TASK_LOG_PATH))
      : {}

    // The process argument processor
    this.options = props.options
    // The test configuration JSON
    this.testConf = {}
    this.testConfPath = TaskRunner.DEFAULT_CONF_PATH
  }

  static get TEMPLATE_CONF_PATH () {
    return path.resolve(__dirname, 'test.template.conf.js')
  }

  static get DEFAULT_CONF_PATH () {
    return TaskRunner._getTargetPath('./test.conf.js')
  }

  static get TEST_CONF_PATH () {
    return TaskRunner._getTargetPath('./test.conf.js')
  }

  static get TEMPLATES_PATH () {
    return path.resolve(__dirname, 'templates/')
  }

  static get TASK_LOG_PATH () {
    return TaskRunner._getTargetPath('.create_test_env.log')
  }

  static _getTargetPath (relativePath) {
    return path.resolve(process.cwd(), relativePath)
  }

  static _getTemplatePath (filename) {
    return path.resolve(TaskRunner.TEMPLATES_PATH, filename)
  }

  /**
   * Clean generated file based on .create_test_env.log
   */
  static clean () {
    const log = shell.test('-f', TaskRunner.TASK_LOG_PATH) 
      ? JSON.parse(fs.readFileSync(TaskRunner.TASK_LOG_PATH))
      : {}
    
    if (!log.autoGenerated) {
      // Nothing to clean
      return
    }

    log.autoGenerated.forEach(autoGenPath => {
      shell.rm('-rf', autoGenPath)
    })
    log.autoGenerated = []
    fs.writeFileSync(TaskRunner.TASK_LOG_PATH, JSON.stringify(log))
  }

  _isDefaultConf (confKey) {
    return deepEqual(this.testConf[confKey], require(TaskRunner.TEMPLATE_CONF_PATH)[confKey])
  }

  _addToAutoGenerated (autoGenPath) {
    this.log.autoGenerated = this.log.autoGenerated || []
    if (this.log.autoGenerated.indexOf(autoGenPath) === -1) {
      // Add to autogenerated file list if haven't
      this.log.autoGenerated.push(autoGenPath)
    }
  }

  // Create file structure
  // Create test.conf.js
  createTestConf () {
    // Read from argument
    if (this.options.confPath) {
      // Overwrite default one
      this.testConfPath = this.options.confPath
    }

    if (!shell.test('-f', this.testConfPath)) {
      // If the test configure file not exist, we need to create one from default
      console.log(`Create test config file at ${this.testConfPath}`)

      fs.writeFileSync(
        this.testConfPath, 
        fs.readFileSync(TaskRunner.TEMPLATE_CONF_PATH))

      this._addToAutoGenerated(this.testConfPath)
      this.testConf = require(this.testConfPath)
    }
    else {
      // config file exists. Need to add defaults
      this.testConf = util.getExtendDefault(
        require(this.testConfPath), 
        require(TaskRunner.TEMPLATE_CONF_PATH)
      )
    }

    return this
  }

  // Create test directory (if using default)
  createUnitTests () {
    if (!this._isDefaultConf('unit_specs')) {
      // The unit test specs are using non-default pattern
      // consumer should provide their own test specs here
      return this
    }

    const unitTestDir = TaskRunner._getTargetPath(this.testConf._unit_test_dir)

    if (shell.test('-e', unitTestDir)) {
      // If the unit test directory already exists, do nothing.
      // We will rely on the unit test file pattern option to decide
      // which file to run unit test
      return this
    }

    shell.mkdir('-p', unitTestDir);

    this._addToAutoGenerated(unitTestDir)

    const exampleUnitTestPath = path.resolve(unitTestDir, 'example.test.js')
    fs.writeFileSync(exampleUnitTestPath, fs.readFileSync(TaskRunner._getTemplatePath('unit.test.js')))
    this._addToAutoGenerated(exampleUnitTestPath)

    return this
  }

  /**
   * Clean the directories/files created
   */
  clean () {
    if (!this.log.autoGenerated) {
      // Nothing to clean
      return this
    }

    this.log.autoGenerated.forEach(autoGenPath => shell.rm('-rf', autoGenPath))
    this.log.autoGenerated = []

    return this
  }

  /**
   * Final tasks
   */
  final () {
    // Create task log
    // Write auto generated logs
    fs.writeFileSync(TaskRunner.TASK_LOG_PATH, JSON.stringify(this.log))
  }
}

module.exports = TaskRunner