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
var replaceInnerHtmlWithValueAttr = require('./html-snippet-to-jsx-snippet/replace-inner-html-with-value-attr')
var removeAllAttrsExceptProps = require('./html-snippet-to-jsx-snippet/remove-all-attrs-except-props')
var addProps = require('./html-snippet-to-jsx-snippet/add-props')

function htmlSnippetToJsxSnippet (component) {
  // ---------- CHEERIO START
  var $ = cheerio.load(
    component.htmlSnippet,
    {
      normalizeWhitespace: true,
      xmlMode: true
    }
  )

  // add dependencies
  component.dependencies = []

  var $root = $.root().children()

  traverse($root, $, function ($node) {
    var componentName = $node.data('component-name')
    if (componentName) {
      component.dependencies = _.union(component.dependencies, [componentName])
      return true
    }
  })

  // TODO: refactor: use babel instead of cheerio to do it
  // replace tag, className and for attributes for root node
  replaceAttrName($root, 'class', 'className')
  replaceAttrName($root, 'for', 'htmlFor')

  // ---------- BABEL AST START
  component.ast = parse($.xml())
  _(component)
    .tap(changeWrapperName)
    .tap(reactifyStyleAttr)
    .tap(tagsToComponentNames)
    .tap(removeComponentInnerHtml)
    .tap(replaceInnerHtmlWithValueAttr)
    .tap(removeAllAttrsExceptProps)
    .tap(addProps)
    .value()

  // remove semicolon at the end of line, otherwise the syntax is wrong
  // NOTE: the third argument of the generate function should be the code
  // however we should NOT use the previous code to generate the new code,
  // and an empty string is enough to remove the error message.
  // So we put an empty string there.
  component.jsxSnippet = generate(
    component.ast,
    {
      retainLines: false,
      comments: false,
      sourceMaps: false
    },
    ''
  ).code.replace(/;$/, '')

  // ast is only a temperory property,
  // we remove it so that the final return value is not a readable
  delete component.ast

  return component
}

function replaceAttrName ($node, oldAttr, newAttr) {
  var attrValue = $node.attr(oldAttr)

  $node.removeAttr(oldAttr)

  if (attrValue) {
    $node.attr(newAttr, attrValue)
  }
}
