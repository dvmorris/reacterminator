const _ = require('lodash')
const htmlToHtmlSnippets = require('./html-to-html-snippets')
const htmlSnippetToJsxSnippet = require('./html-snippet-to-jsx-snippet')
const addDeclaration = require('./add-declaration')
const addImportAndExport = require('./add-import-and-export')

/**
 * Convert html to multiple react components.
 * This function accepts one html string.
 *
 * @param {String} htmlString
 * @param {Object} options options from reacterminator and fileName
 * @return {Object.<string, Component>}
 */
function htmlToReact (htmlString, options) {
  var snippets = htmlToHtmlSnippets(htmlString, options)

  // add plugin key to snippet
  _.each(snippets, function (snippet) {
    // TODO: add a function to add all plugins to options
    // TODO: extract this out into a function
    snippet.plugins = {
      redux: {}
    }

    htmlSnippetToJsxSnippet(snippet, options)
    addDeclaration(snippet, options)
    addImportAndExport(snippet, options)
  })

  return snippets
}

module.exports = htmlToReact
