var wdioConf = require('./wdio.conf')

const unitTestConf = {
  testFilePattern: '**/*.test.js',
  useES6: false
}

const functionalTestConf = {

}

module.exports = {
  unitTest: unitTestConf,
  functionalTest: functionalTestConf,
  wdio: wdioConf
}