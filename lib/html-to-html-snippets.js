module.exports = htmlToHtmlSnippets

var cheerio = require('cheerio')
var KEYS = {
  COMPONENT: 'data-component',
  LIST_ITEM: 'data-component-list-item',
  LIST_PROP: 'data-component-list-prop',
  VALUE: 'data-component-value',
  PROPS: 'data-component-props',
  STATE: 'data-component-state',
  ACTION: 'data-component-action'
}

/**
 * convert html to html snippets
 * @param {String} html
 * @return {Object.<string, Object>} The keys are component names.
 * Each value is a description of the component, including these attributes:
 * htmlSnippet
 */
function htmlToHtmlSnippets (html) {
  var $ = cheerio.load(html)

  var htmlSnippets = {}

  $(`[${KEYS.COMPONENT}]`).each(function () {
    var componentName = $(this).attr(KEYS.COMPONENT)

    // check component name , make sure it is camelcase
    if (!componentName) {
      return
    }

    // do not override a exsiting components
    if (htmlSnippets[componentName]) {
      return
    }

    var $this = $(this).clone()

    // remove attributes that are already used
    $this.removeAttr('data-component')

    // insert into htmlSnippets object
    htmlSnippets[componentName] = {
      htmlSnippet: $this.toString()
    }
  })

  return htmlSnippets
}
