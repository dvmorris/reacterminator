module.exports = reacterminator

var _ = require('lodash')
var fs = require('fs')
var glob = require('glob')
var htmlToHtmlSnippets = require('./html-to-html-snippets')
var htmlSnippetToJsxSnippet = require('./html-snippet-to-jsx-snippet')
var addDeclaration = require('./add-declaration')
var addImportAndExport = require('./add-import-and-export')
var generateFiles = require('./generate-files')

/**
 * convert html to react components
 * @param {Object} input
 * {('path'|'string')} input.type
 * {string} input.content
 * @param {Object} options
 * {string} [options.outputPath='./components']
 * {boolean} [options.generateFiles=false]
 * {boolean} [options.overrideFiles=false]
 */
function reacterminator (input, options) {
  // prepare options
  options = _.extend({outputPath: './components'}, options)
  options.outputPath =
    options.outputPath &&
    options.outputPath.replace(/\/$/, '')

  // unify different input types
  var htmlStrings = []
  if (input.type === 'path') {
    // unify different path types
    var htmlFiles = []
    var inputPath = input.content
    var pathStat = fs.statSync(inputPath)
    if (pathStat.isFile()) {
      htmlFiles = [input.content]
    } else if (pathStat.isDirectory()) {
      var globPattern = options.recursive ? '/**/*.html' : '/*.html'
      htmlFiles = glob.sync(inputPath.replace(/\/$/, '') + globPattern)
    } else {
      console.error('ERROR: the input ' + input.content + ' is not a file or a directory')
      process.exit(1)
    }

    htmlStrings = htmlFiles.map(function (htmlFile) {
      return fs.readFileSync(htmlFile, 'utf8')
    })
  } else if (input.type === 'string') {
    htmlStrings = [input.content]
  } else {
    console.error('ERROR: the input.type should be file or string, not "' + input.type + '"')
    process.exit(1)
  }

  var mergedFileSnippets = htmlStrings
    .reduce(function (fileSnippets, htmlString) {
      return _.extend(htmlToReact(htmlString, options), fileSnippets)
    }, {})

  if (options.generateFiles) {
    generateFiles(mergedFileSnippets, options)
  }

  return mergedFileSnippets
}

function htmlToReact (htmlString, options) {
  // from: <div data-component-name="ComponentA"><div data-component-name="ComponentB"></div></div>
  // to:   <div><div data-component-name="ComponentB"></div></div> and
  //       <div data-component-name="ComponentB"></div>
  var snippets = htmlToHtmlSnippets(htmlString)
  // from: <div><div data-component-name="ComponentB"></div></div>
  // to:   <div className="a" htmlFor="a" style={{fontSize: '1px'}}></div>
  var jsxSnippets = _.mapValues(snippets, htmlSnippetToJsxSnippet)
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

  return fileSnippets
}
