/* eslint-env mocha */
const assert = require('chai').assert
const processJsxByType = require('../../../../../../lib/plugins/redux/process-jsx/process-jsx-by-type')

describe('lib/plugins/redux/process-jsx/process-jsx-by-type.js', function () {
  it('should throw an error when the type is not recognized', function () {
    assert.throws(
      () => { processJsxByType({}) },
      /is not recognized/
    )
  })
})
