/* eslint-env mocha */
var fs = require('fs')
var path = require('path')
var assert = require('chai').assert
var generateFiles = require('../../../lib/generate-files.js')

describe('generate-files', function () {
  it('should generate a file', function () {
    var fileSnippet = `\
import ComponentB from './components/ComponentB.jsx';

class ComponentA extends React.Component {
  render() {
    return <ComponentB></ComponentB>
  }
}

export default ComponentA;`

    var components = {
      ComponentA: {
        name: 'ComponentA',
        fileSnippet: fileSnippet
      }
    }

    generateFiles(
      components,
      {outputPath: path.resolve('./components'), overrideFiles: true}
    )

    assert.deepEqual(
      fs.readFileSync(process.cwd() + '/components/ComponentA.jsx', 'utf-8'),
      fileSnippet
    )
  })

  it('should skip a file', function () {
    var fileSnippet = `\
class ComponentA extends React.Component {
  render() {
    return <div></div>
  }
}`

    generateFiles(
      {
        ComponentA: {
          name: 'ComponentA',
          fileSnippet: fileSnippet
        }
      },
      {outputPath: path.resolve('./components'), overrideFiles: true}
    )

    assert.deepEqual(
      fs.readFileSync(process.cwd() + '/components/ComponentA.jsx', 'utf-8'),
      fileSnippet
    )

    generateFiles(
      {
        ComponentA: {
          name: 'ComponentA',
          fileSnippet: ''
        }
      },
      {outputPath: path.resolve('./components'), overrideFiles: false}
    )

    assert.deepEqual(
      fs.readFileSync(process.cwd() + '/components/ComponentA.jsx', 'utf-8'),
      fileSnippet
    )
  })
})
