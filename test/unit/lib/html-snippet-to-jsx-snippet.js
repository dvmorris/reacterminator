/* eslint-env mocha */
var assert = require('chai').assert
var htmlSnippetToJsxSnippet = require('../../../lib/html-snippet-to-jsx-snippet')

describe('html-to-html-snippets', function () {
  it('should convert html snippet to jsx ast', function () {
    var component = {
      name: 'ComponentA',
      htmlSnippet: '<div> <ComponentB></ComponentB> </div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet(component).jsxSnippet,
`\
var ComponentA = React.createClass({
  render: function () {
    return <div> <ComponentB></ComponentB> </div>;
  }
});`
    )
  })
})
