/* eslint-env mocha */
var fs = require('fs')
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
      {outputPath: './components', overrideFiles: true}
    )

    assert.deepEqual(
      fs.readFileSync(process.cwd() + '/components/ComponentA.jsx', 'utf-8'),
      fileSnippet
    )
  })
})
