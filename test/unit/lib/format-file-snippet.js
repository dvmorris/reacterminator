/* eslint-env mocha */
var assert = require('chai').assert
var formatFileSnippet = require('../../../lib/format-file-snippet')

describe('format-file-snippet', function () {
  it('should format nested tags', function () {
    var component = {
      name: 'ComponentA',
      fileSnippet: `\
class ComponentA extends React.Component {
  render() {
    return <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>
  }
}

export default ComponentA;\n`
    }

    assert.deepEqual(
      formatFileSnippet(component).formattedFileSnippet,
      `\
class ComponentA extends React.Component {
  render() {
    return <ul>
             <li>
               Item 1
             </li>
             <li>
               Item 2
             </li>
             <li>
               Item 3
             </li>
             <li>
               Item 4
             </li>
             <li>
               Item 5
             </li>
           </ul>
  }
}

export default ComponentA;\n`
    )
  })
})
