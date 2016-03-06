/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe.skip('reacterminator', function () {

  // ----------------------------------------
  it('should generate two nested components', function () {
    var content =
`\
<div data-component="ComponentA">
  <div data-component="ComponentB">
  </div>
</div>
`
    var ComponentA =
`\
import ComponentB from './ComponentB';

class ComponentA extends React.Component {
  render() {
    return (
      <div>
        <ComponentB></ComponentB>
      </div>
    );
  }
}

export default ComponentA;
`
    var ComponentB =
`\
class ComponentB extends React.Component {
  render() {
    return (
      <div></div>
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

  // ----------------------------------------
  it('should generate three nested components', function () {

    var content =
`\
<div data-component="ComponentA">
  <div data-component="ComponentB">
    <div data-component="ComponentC">
    </div>
  </div>
</div>
`
    var ComponentA =
`\
import ComponentB from './ComponentB';

class ComponentA extends React.Component {
  render() {
    return (
      <div>
        <ComponentB></ComponentB>
      </div>
    );
  }
}

export default ComponentA;
`

    var ComponentB =
`\
import ComponentC from './ComponentC';

class ComponentB extends React.Component {
  render() {
    return (
      <div>
        <ComponentC></ComponentC>
      </div>
    );
  }
}

export default ComponentB;
`

    var ComponentC =
`\
class ComponentC extends React.Component {
  render() {
    return (
      <div></div>
    );
  }
}

export default ComponentC;
`

    assert.deepEqual(
      reacterminator({type: 'string', content: content}),
      {ComponentA: ComponentA, ComponentB: ComponentB}
    )
  })
})
