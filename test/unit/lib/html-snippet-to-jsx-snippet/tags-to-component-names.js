/* eslint-env mocha */
var assert = require('chai').assert
var parse = require('../../../../lib/helpers/parse')
var generate = require('babel-generator').default
var tagsToComponentNames = require('../../../../lib/html-snippet-to-jsx-snippet/tags-to-component-names')

describe('change tags to component names', function () {
  it('should change tags to component names', function () {
    var ast = parse('<div><div data-component-name="ComponentA"/></div>')
    tagsToComponentNames({ast: ast})

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<div><ComponentA data-component-name="ComponentA" /></div>;'
    )
  })
})
