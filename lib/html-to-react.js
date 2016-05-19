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
  const snippets = htmlToHtmlSnippets(htmlString, options)

  _.each(snippets, function (snippet) {
    // initialize plugins in the snippet
    snippet.plugins = _.mapValues(options.plugins, () => ({}))

    htmlSnippetToJsxSnippet(snippet, options)
    addDeclaration(snippet, options)
    addImportAndExport(snippet, options)
  })

  return snippets
}

module.exports = htmlToReact
