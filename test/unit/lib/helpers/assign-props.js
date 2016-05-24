/* eslint-env mocha */
var assert = require('chai').assert
var assignProps = require('../../../../lib/helpers/assign-props')

describe('assign-props', function () {
  it('should throw an error when the props is not an object', function () {
    assert.throws(function () {
      assignProps({})
    }, /should be an object/)
  })
})
