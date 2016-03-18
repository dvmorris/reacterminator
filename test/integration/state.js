/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe('reacterminator', function () {
  it('should destruct state', function () {
    var content = `\
<div data-component-name="ComponentA" data-component-state="firstName, lastName">
</div>`
    var expected = `\
class ComponentA extends React.Component {
  render() {
    const {firstName, lastName} = this.state;

    return (
      <div>
      </div>
      );
  }
}

export default ComponentA;\n`

    var actual = reacterminator({type: 'string', content: content})
    .ComponentA
    .formattedFileSnippet

    console.log(reacterminator({type: 'string', content: content}).ComponentA.formattedFileSnippet)
    assert.deepEqual(actual, expected)
  })
})
