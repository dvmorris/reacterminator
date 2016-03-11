module.exports = htmlToHtmlSnippets

var cheerio = require('cheerio')
var _ = require('lodash')
var ATTR_NAMES_TO_DATA_NAMES = {
  name: 'data-component-name',
  listItem: 'data-component-list-item',
  listProp: 'data-component-list-prop',
  value: 'data-component-value',
  props: 'data-component-props',
  state: 'data-component-state',
  action: 'data-component-action'
}
var DATA_NAMES_TO_ATTR_NAMES = _.invert(ATTR_NAMES_TO_DATA_NAMES)
var DATA_NAMES = _.keys(DATA_NAMES_TO_ATTR_NAMES)

/**
 * convert html to html snippets
 * @param {String} html
 * @return {Object.<string, Object>} The keys are component names.
 * Each value is a description of the component, including these attributes:
 * htmlSnippet
 */
function htmlToHtmlSnippets (html) {
  var $ = cheerio.load(html, {normalizeWhitespace: true})

  var htmlSnippets = {}

  $('[data-component-name]').each(function () {
    var componentName = _.trim($(this).attr('data-component-name'))

    // check component name , make sure it is camelcase
    if (!componentName) {
      return
    }

    // do not override a exsiting components
    if (htmlSnippets[componentName]) {
      return
    }

    // get all annotated attributes
    var $element = $(this).clone()

    var component = _.reduce(DATA_NAMES, function (acc, dataName) {
      var attr = _.trim($element.attr(dataName))
      if (!attr) {
        return acc
      }

      var attrName = DATA_NAMES_TO_ATTR_NAMES[dataName]
      acc[attrName] = attr
      $element.removeAttr(dataName)
      return acc
    }, {})

    // convert element to string snippet
    component.htmlSnippet = $element.toString()

    // insert into htmlSnippets object
    htmlSnippets[componentName] = component
  })

  return htmlSnippets
}
