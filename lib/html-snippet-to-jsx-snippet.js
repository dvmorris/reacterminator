module.exports = htmlSnippetToJsxSnippet

var _ = require('lodash')
var cheerio = require('cheerio')
var parse = _.partial(require('babylon').parse, _, {plugins: ['jsx']})
var generate = require('babel-generator').default
var Attr = require('./attr')
var traverse = require('./helpers/traverse')
var reactifyStyleAttr = require('./html-snippet-to-jsx-snippet/reactify-style-attr')

function htmlSnippetToJsxSnippet (component) {
  // ---------- CHEERIO START
  var $ = cheerio.load(
    component.htmlSnippet,
    {
      normalizeWhitespace: true,
      xmlMode: true
    }
  )

  var $root = $.root().children()

  var dependencies = []

  // replace tag, className and for attributes
  traverse($root, $, function ($node) {
    // replace html with react components
    var componentName = $node.data('component-name')
    if (componentName) {
      $node.get(0).tagName = componentName
      $node.empty()
      new Attr($node).extract()

      dependencies = _.union(dependencies, [componentName])
    }

    // replace attr names
    replaceAttrName($node, 'class', 'className')
    replaceAttrName($node, 'for', 'htmlFor')
  })

  var jsxSnippetWithCorrectTagName = $.xml()

  // ---------- BABEL AST START
  // change style attribute
  var jsxAstWithCorrectTagName = parse(jsxSnippetWithCorrectTagName)
  var jsxAstWithCorrectStyle = reactifyStyleAttr(jsxAstWithCorrectTagName)

  // remove semicolon at the end of line, otherwise the syntax is wrong
  // NOTE: the third argument of the generate function should be the code
  // however we should NOT use the previous code to generate the new code,
  // and an empty string is enough to remove the error message.
  // So we put an empty string there.
  component.jsxSnippet = generate(
    jsxAstWithCorrectStyle,
    {
      retainLines: false,
      comments: false,
      sourceMaps: false
    },
    ''
  ).code.replace(/;$/, '')

  component.dependencies = dependencies
  return component
}

function replaceAttrName ($node, oldAttr, newAttr) {
  var attrValue = $node.attr(oldAttr)

  $node.removeAttr(oldAttr)

  if (attrValue) {
    $node.attr(newAttr, attrValue)
  }
}
