module.exports = htmlToHtmlSnippets

var _ = require('lodash')
var chalk = require('chalk')
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
    var componentName = _.trim($(this).attr('data-component-name'))

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

    // do not override a exsiting components
    if (htmlSnippets[componentName]) {
      return
    }

    // get all annotated attributes
    var $element = $(this).clone()

    var attr = new Attr($element)
    var component = attr.getAll()
    attr.removeAll()

    $element
      .contents()
      .filter(function () {
        if (this.nodeType === COMMENT_NODE_TYPE) {
          // remove comment nodes
          console.log(
            '>  The comment node is removed from ' +
            chalk.red.bold(component.name) + ':\n' +
            $(this).toString()
          )
          return true
        } else if ($(this).get(0).tagName === 'script') {
          // remove script tags
          console.log(
            '>  The script tag is removed from ' +
            chalk.red.bold(component.name) + ':\n' +
            $(this).toString()
          )
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
