/* eslint-env mocha */
var assert = require('chai').assert
var htmlToHtmlSnippets = require('../../../lib/html-to-html-snippets')

describe('html-to-html-snippets]', function () {
  it('should export a function', function () {
    assert.typeOf(htmlToHtmlSnippets, 'Function')
  })

  it('should output one component', function () {
    var html = `\
<div data-component-name="ComponentA">
</div>`

    assert.deepEqual(
      htmlToHtmlSnippets(html),
      {
        ComponentA: {
          htmlSnippet: '<div> </div>',
          name: 'ComponentA'
        }
      }
    )
  })

  it('should output two nested components', function () {
    var html = `\
<div data-component-name="ComponentA">
  <div data-component-name="ComponentB">
  </div>
</div>`

    assert.deepEqual(
      htmlToHtmlSnippets(html),
      {
        ComponentA: {
          name: 'ComponentA',
          htmlSnippet: '<div> <div data-component-name=\"ComponentB\"> </div> </div>'
        },
        ComponentB: {
          name: 'ComponentB',
          htmlSnippet: '<div> </div>'
        }
      }
    )
  })
})
