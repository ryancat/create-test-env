module.exports = {
  // For functional tests
  wdioConf: require('./wdio.conf').config,
  
  unit_specs: ['./tests/unit/**/*.test.js'],
  functional_specs: ['./tests/functional/**/*.test.js'],

  base_url: 'http://localhost',

  // Private
  _unit_test_dir: './tests/unit/',
  _functional_test_dir: './tests/functional/'
}