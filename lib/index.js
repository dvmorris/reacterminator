module.exports = reacterminator

var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var glob = require('glob')
var htmlToHtmlSnippets = require('./html-to-html-snippets')
var htmlSnippetToJsxSnippet = require('./html-snippet-to-jsx-snippet')
var addDeclaration = require('./add-declaration')
var addImportAndExport = require('./add-import-and-export')
var formatFileSnippet = require('./format-file-snippet')
var generateFiles = require('./generate-files')

/**
 * convert html to react components
 *
 * @param {Object} input
 * {('path'|'string')} input.type
 * {string} input.content
 *          When input.type is 'string', input.content is the html content.
 *          When input.type is 'path', input.content specify the path.
 *          The path can be a directory or a file.
 *
 * @param {Object} options
 * {boolean} [options.generateFiles=false]
 * {string}  [options.outputPath='./components']
 * {boolean} [options.recursive=false]
 *           When it is true, reacterminator will find .html files recursivly
 *           and convert all to them into react components.
 *           When it is false, reacterminator will only find the .html files
 *           in the current directory.
 * {boolean} [options.overrideFiles=false]
 *           When it is true reacterminator will override files it there
 *           is already a file in the output directory.
 */
function reacterminator (input, options) {
  // prepare options
  options = _.extend({outputPath: './components'}, options)
  options.outputPath = path.resolve(options.outputPath)

  // unify different input types
  var htmlStrings = []
  if (input.type === 'path') {
    // unify different path types
    var htmlFiles = []
    var absoluteInputPath = path.resolve(input.content)

    var pathStat = fs.statSync(absoluteInputPath)
    if (pathStat.isFile()) {
      htmlFiles = [input.content]
    } else if (pathStat.isDirectory()) {
      var globPattern = options.recursive ? '/**/*.html' : '/*.html'
      htmlFiles = glob.sync(absoluteInputPath + globPattern)
    } else {
      throw new Error(input.content + 'is not a file or directory')
    }

    htmlStrings = htmlFiles.map(function (htmlFile) {
      return fs.readFileSync(htmlFile, 'utf8')
    })
  } else if (input.type === 'string') {
    htmlStrings = [input.content]
  } else {
    throw new Error('the input.type should be "path" or "string", not "' + input.type + '"')
  }

  var mergedFileSnippets = htmlStrings
    .reduce(function (fileSnippets, htmlString) {
      return _.extend(htmlToReact(htmlString, options), fileSnippets)
    }, {})

  if (_.isEmpty(mergedFileSnippets)) {
    throw new Error('No components are detected, please specify data-component-name on the tags you want as a component')
  }

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
  // to:   import ComponentB from './ComponentB.jsx';
  //       var ComponentA = React.createClass({
  //         render: function () {
  //           return <ComponentB></ComponentB>
  //         }
  //       })
  //       export default ComponentA;`
  var fileSnippets = _.mapValues(declarationSnippets, addImportAndExport)

  // from: var ComponentA = React.createClass({
  //         render: function () {
  //           return <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>
  //         }
  //       })
  //       export default ComponentA;`
  // to:   var ComponentA = React.createClass({
  //         render: function () {
  //           return (
  //           <ul>
  //             <li>Item 1</li>
  //             <li>Item 2</li>
  //             <li>Item 3</li>
  //             <li>Item 4</li>
  //             <li>Item 5</li>
  //           </ul>
  //           )
  //         }
  //       })
  //       export default ComponentA;`
  var formattedFileSnippets = _.mapValues(fileSnippets, formatFileSnippet)

  return formattedFileSnippets
}
