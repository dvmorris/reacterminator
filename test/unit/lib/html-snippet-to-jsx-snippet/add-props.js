/* eslint-env mocha */
const assert = require('chai').assert
const parse = require('../../../../lib/helpers/parse')
const generate = require('babel-generator').default
const addProps = require('../../../../lib/html-snippet-to-jsx-snippet/add-props')

describe('add props', function () {
  it('should add props', function () {
    const content = `\
<div data-componet-props="isBoolean">
  <div data-component-props="firstName={'Poetic'}"></div>
</div>`

    const expected = `\
<div data-componet-props="isBoolean">
  <div firstName={'Poetic'}></div>
</div>;`

    const ast = parse(content)

    addProps({ast})

    assert.deepEqual(
      generate(ast, {}, '').code,
      expected
    )
  })

  it('should add props and preserve props', function () {
    const content = `\
<div>
  <div data-component-props="firstName={'Poetic'}" className="active"></div>
</div>`

    const expected = `\
<div>
  <div className="active" firstName={'Poetic'}></div>
</div>;`

    const ast = parse(content)

    addProps({ast})

    assert.deepEqual(
      generate(ast, {}, '').code,
      expected
    )
  })
})
