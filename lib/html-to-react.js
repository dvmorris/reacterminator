const _ = require('lodash')
const htmlToHtmlSnippets = require('./html-to-html-snippets')
const htmlSnippetToJsxSnippet = require('./html-snippet-to-jsx-snippet')
const addDeclaration = require('./add-declaration')
const processImportAndExport = require('./add-import-and-export')

/**
 * Convert html to multiple react components.
 * This function accepts one html string.
 * This function use the following pipes to process string snippets
 * {@link htmlToHtmlSnippets}
 * {@link htmlSnippetToJsxSnippet}
 * {@link addDeclaration}
 * {@link processImportAndExport}
 * {@link formatFileSnippet}
 *
 * @param {String} htmlString
 * @param {Object} options options from reacterminator and fileName
 * @return {Object.<string, Component>}
 */
function htmlToReact (htmlString, options) {
  var snippets = htmlToHtmlSnippets(htmlString, options)

  // add plugin key to snippet
  _.each(snippets, function (snippet) {
    snippet.plugins = {
      redux: {}
    }
  })

  var jsxSnippets = _.mapValues(snippets, function (snippet) {
    return htmlSnippetToJsxSnippet(snippet, options)
  })
  var declarationSnippets = _.mapValues(jsxSnippets, addDeclaration)
  var fileSnippets = _.mapValues(declarationSnippets, processImportAndExport)

  return fileSnippets
}

module.exports = htmlToReact
