/* eslint-env mocha */
var assert = require('chai').assert
var addImportAndExport = require('../../../lib/add-import-and-export')

describe('add-import-and-export', function () {
  it('should add import and export', function () {
    var component = {
      name: 'ComponentA',
      dependencies: ['ComponentB'],
      declarationSnippet: `\
var ComponentA = React.createClass({
  render: function () {
    return <ComponentB></ComponentB>
  }
})`
    }

    assert.deepEqual(
      addImportAndExport(component, {outputPath: './components'}).fileSnippet,
      `\
import ComponentB from './components/ComponentB.jsx';

var ComponentA = React.createClass({
  render: function () {
    return <ComponentB></ComponentB>
  }
})

export default ComponentA;`
    )
  })

  it('should import multiple components', function () {
    var component = {
      name: 'ComponentA',
      dependencies: ['ComponentB'],
      declarationSnippet: `\
var ComponentA = React.createClass({
render: function () {
  return <ComponentB></ComponentB>
}
})`
    }

    assert.deepEqual(
      addImportAndExport(component, {outputPath: './components'}).fileSnippet,
      `\
import ComponentB from './components/ComponentB.jsx';

var ComponentA = React.createClass({
render: function () {
  return <ComponentB></ComponentB>
}
})

export default ComponentA;`
    )
  })
})
