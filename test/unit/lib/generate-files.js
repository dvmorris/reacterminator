/* eslint-env mocha */
var fs = require('fs')
var path = require('path')
var assert = require('chai').assert
var generateFiles = require('../../../lib/generate-files.js')

describe('generate-files', function () {
  it('should generate a file', function () {
    var formattedFileSnippet = `\
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
        formattedFileSnippet: formattedFileSnippet,
        removedComments: [],
        removedScriptTags: []
      }
    }

    generateFiles(
      components,
      {outputPath: path.resolve('./components'), overrideFiles: true}
    )

    assert.deepEqual(
      fs.readFileSync(process.cwd() + '/components/ComponentA.jsx', 'utf-8'),
      formattedFileSnippet
    )
  })

  it('should skip a file', function () {
    var formattedFileSnippet = `\
class ComponentA extends React.Component {
  render() {
    return <div></div>
  }
}`

    generateFiles(
      {
        ComponentA: {
          name: 'ComponentA',
          formattedFileSnippet: formattedFileSnippet,
          removedComments: [],
          removedScriptTags: []
        }
      },
      {outputPath: path.resolve('./components'), overrideFiles: true}
    )

    assert.deepEqual(
      fs.readFileSync(process.cwd() + '/components/ComponentA.jsx', 'utf-8'),
      formattedFileSnippet
    )

    generateFiles(
      {
        ComponentA: {
          name: 'ComponentA',
          formattedFileSnippet: '',
          removedComments: [],
          removedScriptTags: []
        }
      },
      {outputPath: path.resolve('./components'), overrideFiles: false}
    )

    assert.deepEqual(
      fs.readFileSync(process.cwd() + '/components/ComponentA.jsx', 'utf-8'),
      formattedFileSnippet
    )
  })

  it('should report removed codes', function () {
    var formattedFileSnippet = `\
class ComponentA extends React.Component {
  render() {
    return <div></div>
  }
}`

    generateFiles(
      {
        ComponentA: {
          name: 'ComponentA',
          formattedFileSnippet: formattedFileSnippet,
          removedComments: ['<!-- -->'],
          removedScriptTags: ['<script></script>'],
          removedStyleTags: ['<style></style>']
        }
      },
      {outputPath: path.resolve('./components'), overrideFiles: true}
    )

    assert.deepEqual(
      fs.readFileSync(process.cwd() + '/components/ComponentA.jsx', 'utf-8'),
      formattedFileSnippet
    )
  })
})
