/* eslint-env mocha */
var assert = require('chai').assert
var htmlSnippetToJsxSnippet = require('../../../lib/jsx-to-declaration')

describe('jsx-to-declaration', function () {
  it('should convert html snippet to jsx ast', function () {
    var component = {
      name: 'ComponentA',
      htmlSnippet: '<div></div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet(component).declarationSnippet,
`\
var ComponentA = React.createClass({
  render: function () {
    return <div></div>;
  }
});`
    )
  })
})
