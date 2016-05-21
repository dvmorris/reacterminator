module.exports = htmlSnippetToJsxSnippet

const _ = require('lodash')
const cheerio = require('cheerio')
const generate = require('babel-generator').default
const parse = require('../helpers/parse')
const traverse = require('../helpers/traverse')
const changeWrapperName = require('./change-wrapper-name')
const reactifyStyleAttr = require('./reactify-style-attr')
const tagsToComponentNames = require('./tags-to-component-names')
const removeComponentInnerHtml = require('./remove-component-inner-html')
const replaceInnerHtmlWithValueAttr = require('./replace-inner-html-with-value-attr')
const removeAllAttrsExceptProps = require('./remove-all-attrs-except-props')
const addProps = require('./add-props')
const changeLinksForParamStore = require('./change-links-for-param-store')

/**
 * convert html snippet to jsx snippet
 *
 * @example
 * // from:
 * <div class="a" for="a" style="font-size: 1px"></div>
 * // to:
 * <div className="a" htmlFor="a" style={{fontSize: '1px'}}></div>
 *
 * @param {Component} component
 * @return {Component}
 */

function htmlSnippetToJsxSnippet ({
  component, components, options, processName
}) {
  processName = processName || 'processJsx'

  // ---------- CHEERIO START
  const $ = cheerio.load(component.htmlSnippet, {normalizeWhitespace: true})

  // add dependencies
  component.dependencies = []

  const $root = $.root().children()

  traverse($root, $, function ($node) {
    const componentName = $node.data('component-name')
    if (componentName) {
      component.dependencies = _.union(component.dependencies, [componentName])
      return true
    }
  })

  traverse($root, $, function ($node) {
    replaceAttrName($node, 'class', 'className')
    replaceAttrName($node, 'for', 'htmlFor')
  })

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
    .tap(function (component) {
      changeLinksForParamStore(component, options)
    })
    .value()

  if (_.get(options, 'pipThroughPlugins')) {
    const jsxResult = options.pipThroughPlugins(
      processName,
      {
        component,
        ast: component.ast,
        components
      }
    )

    component = jsxResult.component
    component.ast = jsxResult.ast
  }

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
  // we remove it so that the final return value is readable
  delete component.ast

  return component
}

function replaceAttrName ($node, oldAttr, newAttr) {
  const attrValue = $node.attr(oldAttr)

  $node.removeAttr(oldAttr)

  if (attrValue) {
    $node.attr(newAttr, attrValue)
  }
}
