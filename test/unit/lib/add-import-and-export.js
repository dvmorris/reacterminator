/* eslint-env mocha */
var assert = require('chai').assert
var addImportAndExport = require('../../../lib/add-import-and-export')

describe('add-import-and-export', function () {
  it('should add import and export', function () {
    var component = {
      name: 'ComponentA',
      dependencies: ['ComponentB'],
      declarationSnippet: `\
class ComponentA extends React.Component {
  render() {
    return <ComponentB></ComponentB>
  }
}`
    }

    assert.deepEqual(
      addImportAndExport(component, {outputPath: './components'}).fileSnippet,
      `\
import ComponentB from './components/ComponentB.jsx';

class ComponentA extends React.Component {
  render() {
    return <ComponentB></ComponentB>
  }
}

export default ComponentA;\n`
    )
  })

  it('should import multiple components', function () {
    var component = {
      name: 'ComponentA',
      dependencies: ['ComponentB'],
      declarationSnippet: `\
class ComponentA extends React.Component {
  render() {
    return <ComponentB></ComponentB>
  }
}`
    }

    assert.deepEqual(
      addImportAndExport(component, {outputPath: './components'}).fileSnippet,
      `\
import ComponentB from './components/ComponentB.jsx';

class ComponentA extends React.Component {
  render() {
    return <ComponentB></ComponentB>
  }
}

export default ComponentA;\n`
    )
  })
})
