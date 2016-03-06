/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../lib/index')

describe('reacterminator', function () {
  it('should exports a function', function () {
    assert.typeOf(reacterminator, 'Function')
  })
})
