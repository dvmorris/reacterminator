/* eslint-env mocha */
var fs = require('fs')
var path = require('path')
var assert = require('chai').assert
var processFormattedSnippets = require('../../../../../lib/plugins/main/process-formatted-snippets.js')

describe('lib/plugins/main/process-formatted-snippets', function () {
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

    processFormattedSnippets({
      components,
      options: {outputPath: path.resolve('./components')}
    })

    assert.deepEqual(
      fs.readFileSync(process.cwd() + '/components/readonly-components/ComponentA.jsx', 'utf-8'),
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

    processFormattedSnippets({
      components: {
        ComponentA: {
          name: 'ComponentA',
          formattedFileSnippet: formattedFileSnippet,
          removedComments: ['<!-- -->'],
          removedScriptTags: ['<script></script>'],
          removedStyleTags: ['<style></style>']
        }
      },
      options: {outputPath: path.resolve('./components')}
    })

    assert.deepEqual(
      fs.readFileSync(process.cwd() + '/components/readonly-components/ComponentA.jsx', 'utf-8'),
      formattedFileSnippet
    )
  })
})
