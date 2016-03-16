/* eslint-env mocha */
var fs = require('fs')
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe('reacterminator with file input', function () {
  it('should generate one file with one component', function () {
    var ComponentA = `\
class ComponentA extends React.Component {
  render() {
    return <div> </div>;
  }
};

export default ComponentA;\n`

    reacterminator(
      {
        type: 'path',
        content: './examples/single-component.html'
      },
      {
        generateFiles: true,
        overrideFiles: true
      }
    )

    assert.deepEqual(
      fs.readFileSync('./components/ComponentA.jsx', 'utf8'),
      ComponentA
    )
  })

  it('should emit an error when the input type is not allowed', function () {
    assert(function () {
      reacterminator(
        {
          type: 'non-exist',
          content: './examples/single-component.html'
        }
      )
    }, /the input.type should be file or string/)
  })

  it('should emit an error when the input path does not exist', function () {
    assert(function () {
      reacterminator(
        {
          type: 'path',
          content: './not-exist'
        }
      )
    }, /is not a file or a directory/)
  })
})
