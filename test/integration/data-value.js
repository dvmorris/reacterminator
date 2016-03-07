/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe.skip('reacterminator', function () {

  // ----------------------------------------
  it('should replace inner html with data-value', function () {
    var content =
`\
<div data-component="ComponentA">
  <span data-value={this.props.firstName}>Chun</span>
  <span data-value={this.props.lastName}>Yang</span>
</div>
`
    var ComponentA =
`\
class ComponentA extends React.Component {
  render() {
    return (
      <div>
        <span>{this.props.firstName}</span>
        <span>{this.props.lastName}</span>
      </div>
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

})
