/* eslint-env mocha */
var assert = require('chai').assert
var addImportAndExport = require('../../../lib/add-import-and-export')

describe('add-import-and-export', function () {
  it('should not add import when there is no dependencies', function () {
    var component = {
      name: 'ComponentA',
      dependencies: [],
      declarationSnippet: `\
class ComponentA extends React.Component {
  render() {
    return <div></div>
  }
}\n`
    }

    assert.deepEqual(
      addImportAndExport(component, {outputPath: './components'}).fileSnippet,
      `\
class ComponentA extends React.Component {
  render() {
    return <div></div>
  }
}

export default ComponentA;\n`
    )
  })


  it('should add import and export', function () {
    var component = {
      name: 'ComponentA',
      dependencies: ['ComponentB'],
      declarationSnippet: `\
class ComponentA extends React.Component {
  render() {
    return <ComponentB></ComponentB>
  }
}\n`
    }

    assert.deepEqual(
      addImportAndExport(component, {outputPath: './components'}).fileSnippet,
      `\
import ComponentB from './ComponentB';

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
      dependencies: ['ComponentB', 'ComponentC'],
      declarationSnippet: `\
class ComponentA extends React.Component {
  render() {
      return <div><ComponentB></ComponentB><ComponentC></ComponentC></div>
  }
}\n`
    }

    assert.deepEqual(
      addImportAndExport(component, {outputPath: './components'}).fileSnippet,
      `\
import ComponentB from './ComponentB';
import ComponentC from './ComponentC';

class ComponentA extends React.Component {
  render() {
      return <div><ComponentB></ComponentB><ComponentC></ComponentC></div>
  }
}

export default ComponentA;\n`
    )
  })
})
