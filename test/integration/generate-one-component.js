/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe.skip('reacterminator', function () {
  it('should generate one component from one div', function () {
    var source =
`\
<div data-component="ComponentA">
</div>
`
    var actual = reacterminator({type: 'string', content: source})
    var expected =
`\
class ComponentA extends React.Component {
  render() {
    return (
      <div></div>
    );
  }
}

export default ComponentA;
`
    assert.deepEqual(actual, expected)
  })

  it('should generate one component from an html document', function () {
    var source =
`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title></title>
  </head>
  <body>
    <div data-component="ComponentA"'>
    </div>
  </body>
</html>
`
    var actual = reacterminator({type: 'string', content: source})
    var expected =
`
class ComponentA extends React.Component {
  render() {
    return (
      <div></div>
    );
  }
}

export default ComponentA;
`
    assert.deepEqual(actual, expected)
  })
})

// TODO: assertStringToComponent
