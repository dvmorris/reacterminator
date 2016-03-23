/* eslint-env mocha */
var assert = require('chai').assert
var parse = require('../../../../lib/helpers/parse')
var generate = require('babel-generator').default
var changeWrapperName = require('../../../../lib/html-snippet-to-jsx-snippet/change-wrapper-name')

describe('change wrapper name', function () {
  it('should change wrapper name', function () {
    var ast = parse('<div data-component-wrapper="ComponentA"/>')
    changeWrapperName(ast)

    assert.equal(
      generate(ast, {}, '').code,
      '<ComponentA data-component-wrapper="ComponentA" />;'
    )
  })

  it('should change wrapper name for a component with inner content', function () {
    var ast = parse('<div data-component-wrapper="ComponentA">text</div>')
    changeWrapperName(ast)

    assert.equal(
      generate(ast, {}, '').code,
      '<ComponentA data-component-wrapper="ComponentA">text</ComponentA>;'
    )
  })
})
