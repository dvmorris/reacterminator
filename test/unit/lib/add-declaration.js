/* eslint-env mocha */
var assert = require('chai').assert
var addDeclaration = require('../../../lib/add-declaration')

describe('add-declaration', function () {
  it('should add declaration', function () {
    var component = {
      componentName: 'ComponentA',
      jsxSnippet: '<div></div>'
    }

    assert.deepEqual(
      addDeclaration({component}).declarationSnippet,
      `\
class ComponentA extends React.Component {
  render() {
    return (
      <div></div>
      );
  }
};\n`
    )
  })
})
