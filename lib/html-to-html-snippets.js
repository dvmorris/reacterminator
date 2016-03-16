module.exports = htmlToHtmlSnippets

var cheerio = require('cheerio')
var _ = require('lodash')
var Attr = require('./attr')

/**
 * convert html to html snippets
 * @param {String} html
 * @return {Object.<string, Object>} The keys are component names.
 * Each value is a description of the component, including these attributes:
 * htmlSnippet
 * ...
 */
function htmlToHtmlSnippets (html) {
  var $ = cheerio.load(html, {normalizeWhitespace: true})

  var htmlSnippets = {}

  $('[data-component-name]').each(function () {
    var componentName = _.trim($(this).attr('data-component-name'))

    // check component name , make sure it is camelcase
    if (!componentName) {
      throw new Error(
        '> this component does not have a name: \n' +
        $(this).toString()
      )
    } else if (!isUpperCamelCase(componentName)) {
      throw new Error(
        '> this component name "' +
        componentName +
        '" is not upper camel case: \n' +
        $(this).toString()
      )
    }

    // do not override a exsiting components
    if (htmlSnippets[componentName]) {
      return
    }

    // get all annotated attributes
    var $element = $(this).clone()

    var attr = new Attr($element)
    var component = attr.getAll()
    attr.removeAll()

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
