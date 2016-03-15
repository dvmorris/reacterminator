module.exports = reacterminator

var _ = require('lodash')
var fs = require('fs')
var htmlToHtmlSnippets = require('./html-to-html-snippets')
var htmlTagsToComponentTags = require('./html-tags-to-component-tags')
var htmlSnippetToJsxSnippet = require('./html-snippet-to-jsx-snippet')
var addDeclaration = require('./add-declaration')
var addImportAndExport = require('./add-import-and-export')
var generateFiles = require('./generate-files')

/**
 * convert html to react components
 * @param {Object} input
 * {('file'|'string')} input.type
 * {string} input.content
 * @param {Object} options
 * {string} [options.outputPath='./components']
 * {boolean} [options.generateFiles=false]
 * {boolean} [options.overrideFiles=false]
 */
function reacterminator (input, options) {
  var content = input.type === 'file'
    ? fs.readFileSync(input.content)
    : input.content

  options = _.extend({outputPath: './components'}, options)
  // remove trailing '/'
  options.outputPath = options.outputPath.replace(/\/$/, '')

  // from: <div data-component-name="ComponentA"><div data-component-name="ComponentB"></div></div>
  // to:   <div><div data-component-name="ComponentB"></div></div> and
  //       <div data-component-name="ComponentB"></div>
  var snippets = htmlToHtmlSnippets(content)
  // from: <div><div data-component-name="ComponentB"></div></div>
  // to:   <div><ComponentB></ComponentB></div>
  var componentizedSnippets = _.mapValues(snippets, htmlTagsToComponentTags)
  // from: <div class="a" for="a" style="font-size: 1px"></div>
  // to:   <div className="a" htmlFor="a" style={{fontSize: '1px'}}></div>
  var jsxSnippets = _.mapValues(componentizedSnippets, htmlSnippetToJsxSnippet)
  // TODO
  // from: <div name="{name}" style="font-size: 1px">
  // to:   <div name={name} style={{fontSize: '1px'}}>
  // var jsxSnippetsWithValues = _.mapValues(removeQuotes, jsxSnippets)
  // NOTE: use JSX AST to do this

  // from: <div></div>
  // to:   var ComponentA = React.createClass({
  //         render: function () {
  //           return <div></div>
  //         }
  //       })
  var declarationSnippets = _.mapValues(jsxSnippets, addDeclaration)
  // from: var ComponentA = React.createClass({
  //         render: function () {
  //           return <div></div>
  //         }
  //       })
  // to:   import ComponentB from './components/ComponentB.jsx';
  //       var ComponentA = React.createClass({
  //         render: function () {
  //           return <ComponentB></ComponentB>
  //         }
  //       })
  //       export default ComponentA;`
  var fileSnippets = _.mapValues(declarationSnippets, function (declarationSnippet) {
    return addImportAndExport(declarationSnippet, options)
  })

  if (options.generateFiles) {
    generateFiles(fileSnippets, options)
  }

  return fileSnippets
}
