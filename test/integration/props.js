/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe('reacterminator', function () {
  it('should destruct props', function () {
    var content = `\
<div data-component-name="ComponentA" data-component-props="firstName, lastName">
</div>`
    var expected = `\
class ComponentA extends React.Component {
  render() {
    const {firstName, lastName} = this.props;

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

    assert.deepEqual(actual, expected)
  })

  it.skip('should pass props down to inner components', function () {
    var content = `\
<div data-component-name="ComponentA">
  <div data-component-name="ComponentB" data-component-props="firstName">
    <span data-value="firstName">Chun</span>
  </div>
</div>`

    var ComponentA = `\
import ComponentB from './ComponentB';

class ComponentA extends React.Component {
  render() {
    return (
      <ComponentB firstName={firstName}></ComponentB>
    );
  }
}

export default ComponentA;\n`

    var ComponentB = `\
class ComponentB extends React.Component {
  render() {

    const {firstName} = this.props;

    return (
      <div>
        <span>{firstName}</span>
      </div>
    );
  }
}

export default ComponentB;`

    var actual1 = reacterminator({type: 'string', content: content})
      .ComponentA
      .formattedFileSnippet

    var actual2 = reacterminator({type: 'string', content: content})
      .ComponentB
      .formattedFileSnippet

    assert.deepEqual(actual1, ComponentA)
    assert.deepEqual(actual2, ComponentB)
  })
})
