/* eslint-env mocha */
var fs = require('fs')
var rimraf = require('rimraf')
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe('reacterminator with file input', function () {
  beforeEach(function () {
    rimraf.sync('./components')
  })

  it('should generate one file with one component', function () {
    var ComponentA = `\
class ComponentA extends React.Component {
  render() {
    return <div>
           </div>;
  }
}
;

export default ComponentA;\n`

    reacterminator(
      {
        type: 'path',
        content: './examples/test/component-a.html'
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
    assert.throws(
      function () {
        reacterminator(
          {
            type: 'non-exist',
            content: './examples/test/component-a.html'
          }
        )
      },
      /the input.type should be file or string/
    )
  })

  it('should emit an error when the input path does not exist', function () {
    assert.throws(
      function () {
        reacterminator(
          {
            type: 'path',
            content: './not-exist'
          }
        )
      },
      /no such file or directory/
    )
  })

  it('should generate files for all the files in a folder non-recursivly', function () {
    assert.throws(function () { fs.statSync('./components/ComponentA.jsx') })

    reacterminator(
      {
        type: 'path',
        content: './examples/test/'
      },
      {
        generateFiles: true,
        overrideFiles: true
      }
    )

    assert(fs.statSync('./components/ComponentA.jsx').isFile())
    assert.throws(function () { fs.statSync('./components/SubFolder.jsx') })
  })

  it('should generate files for all the files in a folder recursivly', function () {
    assert.throws(function () { fs.statSync('./components/SubFolder.jsx') })
    assert.throws(function () { fs.statSync('./components/ComponentA.jsx') })

    reacterminator(
      {
        type: 'path',
        content: './examples/test'
      },
      {
        generateFiles: true,
        overrideFiles: true,
        recursive: true
      }
    )

    assert(fs.statSync('./components/SubFolder.jsx').isFile())
    assert(fs.statSync('./components/ComponentA.jsx').isFile())
  })

  it('should throw an error when the input file is not a file or directory', function () {
    assert.throws(function () {
      reacterminator(
        {
          type: 'path',
          content: '/dev/null'
        }
      )
    }, /is not a file or directory/)
  })
})
