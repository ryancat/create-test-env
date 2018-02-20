// Template for functional tests
const assert = require('assert')
const testConf = require('../../test.conf')

describe('functional test template', function () {

  it('should pass', function () {
    browser.url(testConf.base_url)
    assert(true)
  })

})