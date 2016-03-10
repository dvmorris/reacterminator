/* eslint-env mocha */
var assert = require('chai').assert
var htmlToHtmlSnippets = require('../../../lib/html-to-html-snippets')

describe('index', function () {
  it('should export a function', function () {
    assert.typeOf(htmlToHtmlSnippets, 'Function')
  })

  it('should output one component', function () {
    var html = `\
<div data-component="ComponentA">
</div>`

    assert.deepEqual(
      htmlToHtmlSnippets(html),
      {
        ComponentA: {
          htmlSnippet: '<div>\n</div>'
        }
      }
    )
  })

  it.skip('should output two nested components', function () {
    var html = `\
<div data-component="ComponentA">
  <div data-component="ComponentB">
  </div>
</div>`

    assert.deepEqual(
      htmlToHtmlSnippets(html),
      {
        ComponentA: {
          htmlSnippet: '<div>\n</div>'
        },
        ComponentB: {
          htmlSnippet: '<div>\n</div>'
        }
      }
    )
  })
})
