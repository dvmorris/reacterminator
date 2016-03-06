/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../../lib/index')

describe('index', function () {
  it('should export a function', function () {
    assert.typeOf(reacterminator, 'Function')
  })
})
