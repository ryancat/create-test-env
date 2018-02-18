module.exports = Object.assign({}, require('./wdio.conf').config, {
  unit_specs: ['./tests/unit/**/*.test.js'],
  functional_specs: ['./tests/functional/**/*.test.js'],

  // Private
  _unit_test_dir: './tests/unit/',
  _functional_test_dir: './tests/functional/'
})