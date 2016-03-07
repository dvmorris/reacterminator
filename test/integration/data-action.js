/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe.skip('reacterminator', function () {

  // ----------------------------------------
  it('should destruct props', function () {
    var content =
`\
<div data-component="ComponentA"
  data-action-on-click="{this.props.onClick}"
  data-action-on-keyup="{this.props.onKeyup}">
</div>
`
    var ComponentA =
`\
class ComponentA extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick} onKeyup={this.props.onKeyup}></div>
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


