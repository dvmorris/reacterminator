/* eslint-env mocha */

var assert = require('assert')
var reacterminator = require('../lib/index')
var _ = require('lodash')

describe('reacterminator', function () {
  it('should exports a function', function () {
    assert(_.isFunction(reacterminator), 'reacterminator is not a function')
  })
})
