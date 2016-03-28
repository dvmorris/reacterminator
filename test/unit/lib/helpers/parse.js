/* eslint-env mocha */
var assert = require('chai').assert
var parse = require('../../../../lib/helpers/parse')

describe('parse', function () {
  it('should throw an error when there is a syntax problem', function () {
    assert.throws(function () {
      parse('<div><style>.classname { font-size: 100px; }</style></div>')
    }, /Unexpected token/)
  })
})
