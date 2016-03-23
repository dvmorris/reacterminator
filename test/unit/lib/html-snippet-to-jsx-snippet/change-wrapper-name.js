/* eslint-env mocha */
var assert = require('chai').assert
var parse = require('../../../../lib/helpers/parse')
var generate = require('babel-generator').default
var changeWrapperName = require('../../../../lib/html-snippet-to-jsx-snippet/change-wrapper-name')

describe('change wrapper name', function () {
  it('should change wrapper name', function () {
    var ast = parse('<div/>')
    changeWrapperName({ast: ast, wrapper: 'ComponentA'})

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<ComponentA />;'
    )
  })

  it('should change wrapper name for a component with inner content', function () {
    var ast = parse('<div >text</div>')
    changeWrapperName({ast: ast, wrapper: 'ComponentA'})

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<ComponentA>text</ComponentA>;'
    )
  })
})
