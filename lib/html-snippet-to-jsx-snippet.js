module.exports = htmlSnippetToJsxSnippet

var _ = require('lodash')
var cheerio = require('cheerio')
var parse = require('./helpers/parse')
var generate = require('babel-generator').default
var traverse = require('./helpers/traverse')
var changeWrapperName = require('./html-snippet-to-jsx-snippet/change-wrapper-name')
var reactifyStyleAttr = require('./html-snippet-to-jsx-snippet/reactify-style-attr')
var tagsToComponentNames = require('./html-snippet-to-jsx-snippet/tags-to-component-names')
var removeComponentInnerHtml = require('./html-snippet-to-jsx-snippet/remove-component-inner-html')
var removeAllAttrs = require('./html-snippet-to-jsx-snippet/remove-all-attrs')

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

  // replace tag, className and for attributes for root node
  replaceAttrName($root, 'class', 'className')
  replaceAttrName($root, 'for', 'htmlFor')

  // add dependencies
  // TODO: use babel instead of cheerio to do it
  traverse($root, $, function ($node) {
    var componentName = $node.data('component-name')
    if (componentName) {
      dependencies = _.union(dependencies, [componentName])
      return true
    }
  })

  var jsxSnippetWithCorrectTagName = $.xml()

  // ---------- BABEL AST START
  // change style attribute
  var ast = _(parse(jsxSnippetWithCorrectTagName))
    .tap(changeWrapperName)
    .tap(reactifyStyleAttr)
    .tap(tagsToComponentNames)
    .tap(removeComponentInnerHtml)
    .tap(removeAllAttrs)
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
