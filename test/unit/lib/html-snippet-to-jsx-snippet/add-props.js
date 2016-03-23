/* eslint-env mocha */
var assert = require('chai').assert
var parse = require('../../../../lib/helpers/parse')
var generate = require('babel-generator').default
var addProps = require('../../../../lib/html-snippet-to-jsx-snippet/add-props')

describe('add props', function () {
  it('should add props', function () {

    var content = `\
<div data-componet-props="isBoolean">
  <div data-component-props="firstName={'Poetic'}"></div>
</div>`

    var expected = `\
<div data-componet-props="isBoolean">
  <div firstName={'Poetic'}></div>
</div>;`

    var ast = parse(content)

    addProps({ast: ast})

    assert.deepEqual(
      generate(ast, {}, '').code,
      expected
    )
  })
})
