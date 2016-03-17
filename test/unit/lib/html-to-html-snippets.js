/* eslint-env mocha */
var assert = require('chai').assert
var htmlToHtmlSnippets = require('../../../lib/html-to-html-snippets')

describe('html-to-html-snippets', function () {
  it('should export a function', function () {
    assert.typeOf(htmlToHtmlSnippets, 'Function')
  })

  it('should output one component', function () {
    var html = `\
<div data-component-name="ComponentA">
</div>`

    assert.equal(
      htmlToHtmlSnippets(html).ComponentA.htmlSnippet,
      '<div> </div>'
    )
  })

  it('should output two nested components', function () {
    var html = `\
<div data-component-name="ComponentA">
  <div data-component-name="ComponentB">
  </div>
</div>`

    assert.equal(
      htmlToHtmlSnippets(html).ComponentA.htmlSnippet,
      '<div> <div data-component-name=\"ComponentB\"> </div> </div>'
    )
    assert.equal(
      htmlToHtmlSnippets(html).ComponentB.htmlSnippet,
      '<div> </div>'
    )
  })

  it('should extract all data-component attributes', function () {
    var html = `\
<div data-component-name="ComponentA" data-component-list-item="ComponentB" data-component-list-prop="users">
</div>`

    assert.deepEqual(
      htmlToHtmlSnippets(html),
      {
        ComponentA: {
          name: 'ComponentA',
          listItem: 'ComponentB',
          listProp: 'users',
          htmlSnippet: '<div> </div>',
          removedComments: [],
          removedScriptTags: []
        }
      }
    )
  })

  it('should throw an error when the name is empty', function () {
    var html = `\
<div data-component-name="">
</div>`

    assert.throws(
      function () {
        htmlToHtmlSnippets(html)
      },
      /this component does not have a name/
    )
  })

  it('should throw an error when the name is not upper camelcase', function () {
    assert.throws(
      function () {
        htmlToHtmlSnippets('<div data-component-name="abcdef"></div>')
      },
      /is not upper camel case/
    )
    assert.throws(
      function () {
        htmlToHtmlSnippets('<div data-component-name="Abc-def"></div>')
      },
      /is not upper camel case/
    )
  })

  it('should not override an existing component', function () {
    var html = `\
<div data-component-name="ComponentA">first</div>
<div data-component-name="ComponentA">second</div>`

    assert.deepEqual(
      htmlToHtmlSnippets(html).ComponentA.htmlSnippet,
      '<div>first</div>'
    )
  })

  it('should remove commented nodes', function () {
    var html = `\
<div data-component-name="ComponentA">
  <!--[if lte IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script><![endif]-->
</div>`

    var outputComponent = htmlToHtmlSnippets(html).ComponentA

    assert.equal(outputComponent.htmlSnippet, '<div>  </div>')
    assert.deepEqual(outputComponent.removedComments, ['<!--[if lte IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script><![endif]-->'])
  })

  it('should remove script tags', function () {
    var html = `\
<div data-component-name="ComponentA">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script>
</div>`

    var outputComponent = htmlToHtmlSnippets(html).ComponentA

    assert.equal(outputComponent.htmlSnippet, '<div>  </div>')
    assert.deepEqual(outputComponent.removedScriptTags, ['<script src=\"https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js\"/>'])
  })
})
