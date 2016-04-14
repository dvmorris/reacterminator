/* eslint-env mocha */
var _ = require('lodash')
var fs = require('fs')
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe('reacterminator with file input', function () {
  it('should ignore files end with ignore.html', function () {
    var components = reacterminator(
      {
        type: 'path',
        content: './examples/test'
      }
    )

    assert.notInclude(_.keys(components), 'TestIgnore')
  })
})
