module.exports = htmlToHtmlSnippets

var path = require('path')
var cheerio = require('cheerio')
var Attr = require('./attr')
var COMMENT_NODE_TYPE = 8
var upperCamelCase = require('./helpers/upper-camel-case')

/**
 * convert one html string to several html snippets
 *
 * @example
 * // from:
 * <div data-component-name="ComponentA">
 *   <div data-component-name="ComponentB">
 *   </div>
 * </div>
 * // to:
 * <div><div data-component-name="ComponentB"></div></div>
 * <div data-component-name="ComponentB"></div>
 *
 * @param {String} html
 * @return {Object.<string, Component>}
 */

function htmlToHtmlSnippets (html, options) {
  options = options || {}

  var $ = cheerio.load(html, { normalizeWhitespace: true })

  var htmlSnippets = {}

  if (options.fileToComponent) {
    var fileNameWithoutExt = path.parse(options.fileName).name
    var fileComponentName = upperCamelCase(fileNameWithoutExt)
    htmlSnippets[fileComponentName] = elementToHtmlSnippet(
      $('body'),
      $,
      htmlSnippets,
      {
        name: fileComponentName,
        wrapper: 'div',
        path: fileNameWithoutExt
      }
    )
  }

  $('[data-component-name]').each(function () {
    var htmlSnippet = elementToHtmlSnippet($(this), $, htmlSnippets)
    if (htmlSnippet) {
      htmlSnippets[htmlSnippet.name] = htmlSnippet
    }
  })

  return htmlSnippets
}

function elementToHtmlSnippet ($element, $, htmlSnippets, options) {
  options = options || {}

  // get all annotated attributes
  $element = $element.clone()

  var component = Object.assign({}, options, new Attr($element).extract())
  var componentName = component.name

  // check component name , make sure it is camelcase
  if (!componentName) {
    throw new Error(
      'this component does not have a name: \n' +
        $element.toString()
    )
  } else if (!isUpperCamelCase(componentName)) {
    throw new Error(
      'this component name "' +
        componentName +
          '" is not upper camel case: \n' +
            $element.toString()
    )
  }

  // only override an existing component if the current is primary
  var isPrimary = component.primary
  var skipCurrentComponent = htmlSnippets[componentName] && !isPrimary
  if (skipCurrentComponent) {
    return
  }

  // remove comment, script and style
  component.removedComments = []
  component.removedScriptTags = []
  component.removedStyleTags = []
  $element
    .contents()
    .filter(function () {
      if (this.nodeType === COMMENT_NODE_TYPE) {
        component.removedComments.push($(this).toString())
        return true
      } else if ($(this).get(0).tagName === 'script') {
        component.removedScriptTags.push($(this).toString())
        return true
      } else if ($(this).get(0).tagName === 'style') {
        component.removedStyleTags.push($(this).toString())
        return true
      }
    })
    .remove()

  // convert element to string snippet
  component.htmlSnippet = $element.toString()

  return component
}

function isUpperCamelCase (string) {
  return !/[-_]/.test(string) && string[0] === string[0].toUpperCase()
}
