/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe.skip('reacterminator', function () {
  it('should destruct state', function () {
    var content = `\
<div data-component-name="ComponentA" data-component-state="firstName, lastName">
</div>`
    var ComponentA = `\
class ComponentA extends React.Component {

  const {firstName, lastName} = this.state;

  render() {
    return (
      <div></div>
    );
  }
}

export default ComponentA;`

    assert.deepEqual(
      reacterminator({type: 'string', content: content})['ComponentA'],
      ComponentA
    )
  })
})
