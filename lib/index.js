var _ = require('lodash')
var fs = require('fs')
var htmlToHtmlSnippets = require('./html-to-html-snippets')
var htmlTagsToCompentTags = require('./html-tags-to-component-tags')

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

  // from: <div data-component-name="ComponentA"><div data-component-name="ComponentB"></div></div>
  // to:   <div><div data-component-name="ComponentB"></div></div> and
  //       <div data-component-name="ComponentB"></div>
  var snippets = htmlToHtmlSnippets(content)
  // from: <div><div data-component-name="ComponentB"></div></div>
  // to:   <div><ComponentB></ComponentB></div>
  var componentizedSnippets = _.mapValues(snippets, htmlTagsToCompentTags)

  return componentizedSnippets
}
