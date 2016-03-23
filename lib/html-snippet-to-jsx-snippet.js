module.exports = htmlSnippetToJsxSnippet

var _ = require('lodash')
var cheerio = require('cheerio')
var parse = require('./helpers/parse')
var generate = require('babel-generator').default
var Attr = require('./attr')
var traverse = require('./helpers/traverse')
var reactifyStyleAttr = require('./html-snippet-to-jsx-snippet/reactify-style-attr')
var changeWrapperName = require('./html-snippet-to-jsx-snippet/change-wrapper-name')

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
  var ast = _(parse(jsxSnippetWithCorrectTagName))
    .tap(reactifyStyleAttr)
    .tap(changeWrapperName)
    .value()

  // remove semicolon at the end of line, otherwise the syntax is wrong
  // NOTE: the third argument of the generate function should be the code
  // however we should NOT use the previous code to generate the new code,
  // and an empty string is enough to remove the error message.
  // So we put an empty string there.
  component.jsxSnippet = generate(
    ast,
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
