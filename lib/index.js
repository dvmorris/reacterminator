var _ = require('lodash')
var fs = require('fs')
var htmlToHtmlSnippets = require('./html-to-html-snippets')
var htmlTagsToCompentTags = require('./html-tags-to-component-tags')
var htmlSnippetToJsxSnippet = require('./html-snippet-to-jsx-snippet')
var jsxToDeclaration = require('./jsx-to-declaration')

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
  // from: <div class="a" for="a" style="font-size: 1px"></div>
  // to:   <div className="a" htmlFor="a" style={{fontSize: '1px'}}></div>
  var jsxSnippets = _.mapValues(componentizedSnippets, htmlSnippetToJsxSnippet)
  // TODO use jsxAst
  // from: <div name="{name}" style="font-size: 1px">
  // to:   <div name={name} style={{fontSize: '1px'}}>

  // from: <div></div>
  // to:   var ComponentA = React.createClass({
  //         render: function () {
  //           return <div></div>
  //         }
  //       })
  var declarationSnippets = _.mapValues(jsxSnippets, jsxToDeclaration)

  // TODO: IMPORT AND EXPORT

  // TODO: generate files

  return declarationSnippets
}
