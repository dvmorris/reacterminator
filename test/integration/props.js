/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe.skip('reacterminator', function () {

  // ----------------------------------------
  it('should destruct props', function () {
    var content =
`\
<div data-component-name="ComponentA" data-component-props="firstName, lastName">
</div>
`
    var ComponentA =
`\
class ComponentA extends React.Component {

  const {firstName, lastName} = this.props;

  render() {
    return (
      <div></div>
    );
  }
}

export default ComponentA;
`

    assert.deepEqual(
      reacterminator({type: 'string', content: content})['ComponentA'],
      ComponentA
    )
  })

  // ----------------------------------------
  it('should pass props down to inner components', function () {
    var content =
`\
<div data-component-name="ComponentA">
  <div data-component-name="ComponentB" data-component-props="firstName">
    <span data-value="firstName">Chun</span>
  </div>
</div>
`
    var ComponentA =
`\
import ComponentB from './ComponentB';

class ComponentA extends React.Component {
  render() {
    return (
      <ComponentB firstName={firstName}></ComponentB>
    );
  }
}

export default ComponentA;
`

    var ComponentB =
`\
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

export default ComponentB;
`

    assert.deepEqual(
      reacterminator({type: 'string', content: content}),
      {ComponentA: ComponentA, ComponentB: ComponentB}
    )
  })

})

