/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe.skip('reacterminator', function () {
  it('should destruct props', function () {
    var content = `\
<div data-component-name="ComponentA"
  data-component-action-on-click="{this.props.onClick}"
  data-component-action-on-keyup="{this.props.onKeyup}">
</div>`

    var ComponentA = `\
export default class ComponentA extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick} onKeyup={this.props.onKeyup}></div>
      );
  }
}\n`

    assert.deepEqual(
      reacterminator({type: 'string', content: content})['ComponentA'],
      ComponentA
    )
  })
})
