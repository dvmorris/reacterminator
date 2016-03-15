/* eslint-env mocha */
var assert = require('chai').assert
var addDeclaration = require('../../../lib/add-declaration')

describe('add-declaration', function () {
  it('should convert html snippet to jsx ast', function () {
    var component = {
      name: 'ComponentA',
      htmlSnippet: '<div></div>'
    }

    assert.deepEqual(
      addDeclaration(component).declarationSnippet,
      `\
class ComponentA extends React.Component {
  render() {
    return <div></div>;
  }
};`
    )
  })
})
