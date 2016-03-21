module.exports = htmlToHtmlSnippets

var cheerio = require('cheerio')
var Attr = require('./attr')
var COMMENT_NODE_TYPE = 8

/**
 * convert html to html snippets
 * @param {String} html
 * @return {Object.<string, Object>} The keys are component names.
 * Each Object is a description of the component
 */
function htmlToHtmlSnippets (html) {
  var $ = cheerio.load(
    html,
    {
      normalizeWhitespace: true,
      xmlMode: true
    }
  )

  var htmlSnippets = {}

  $('[data-component-name]').each(function () {
    // get all annotated attributes
    var $element = $(this).clone()

    var component = new Attr($element).extract()
    var componentName = component.name

    // check component name , make sure it is camelcase
    if (!componentName) {
      throw new Error(
        'this component does not have a name: \n' +
        $(this).toString()
      )
    } else if (!isUpperCamelCase(componentName)) {
      throw new Error(
        'this component name "' +
        componentName +
        '" is not upper camel case: \n' +
        $(this).toString()
      )
    }

    // only override an existing component if the current is primary
    var isPrimary = component.primary
    var skipCurrentComponent = htmlSnippets[componentName] && !isPrimary
    if (skipCurrentComponent) {
      return
    }

    // remove comment nodes and script tags
    component.removedComments = []
    component.removedScriptTags = []
    $element
      .contents()
      .filter(function () {
        if (this.nodeType === COMMENT_NODE_TYPE) {
          component.removedComments.push($(this).toString())
          return true
        } else if ($(this).get(0).tagName === 'script') {
          component.removedScriptTags.push($(this).toString())
          return true
        }
      })
      .remove()

    // convert element to string snippet
    component.htmlSnippet = $element.toString()

    // insert into htmlSnippets object
    htmlSnippets[componentName] = component
  })

  return htmlSnippets
}

function isUpperCamelCase (string) {
  return !/[-_]/.test(string) && string[0] === string[0].toUpperCase()
}
