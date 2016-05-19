/* eslint-env mocha */
const fs = require('fs')
const path = require('path')
const assert = require('chai').assert
const processFormattedSnippets = require('../../../../../lib/plugins/main/process-formatted-snippets.js')

describe('lib/plugins/main/process-formatted-snippets', function () {
  it('should generate a file', function () {
    const formattedFileSnippet = `\
import ComponentB from './components/ComponentB.jsx';

class ComponentA extends React.Component {
  render() {
    return <ComponentB></ComponentB>
  }
}

export default ComponentA;`

    const components = {
      ComponentA: {
        componentName: 'ComponentA',
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
    const formattedFileSnippet = `\
class ComponentA extends React.Component {
  render() {
    return <div></div>
  }
}`

    processFormattedSnippets({
      components: {
        ComponentA: {
          componentName: 'ComponentA',
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
