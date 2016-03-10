var fs = require('fs')
var htmlToHtmlSnippets = require('./html-to-html-snippets')

module.exports = reacterminator

/**
 * convert html to react components
 * @param {Object} input
 * {('file'|'string')} input.type
 * {string} input.content
 * @param {Object} options
 */
function reacterminator (input, options) {
  var content = input.type === 'file'
    ? fs.readFileSync(input.content)
    : input.content

  var snippets = htmlToHtmlSnippets(content)

  return snippets
}
