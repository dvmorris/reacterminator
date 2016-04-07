module.exports = reacterminator

var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var glob = require('glob')
var htmlToHtmlSnippets = require('./html-to-html-snippets')
var htmlSnippetToJsxSnippet = require('./html-snippet-to-jsx-snippet')
var addDeclaration = require('./add-declaration')
var addImportAndExport = require('./add-import-and-export')
var addContainers = require('./add-containers')
var formatFileSnippet = require('./format-file-snippet')
var generateFiles = require('./generate-files')

/**
 * component object passed through the transform pipline
 * @typedef {Object} Component
 * @property {String} name the name of the component
 * @property {Boolean} primary is primary if there are duplications
 * @property {String} imports custom imports
 * @property {String} wrapper wrapper component name
 */

/**
 * Convert html to react components.
 * This function accepts multiple or single html file.
 * This function use {@link htmlToReact}
 *
 * @param {Object} input
 * @param {('path'|'string')} input.type
 * @param {string} input.content
 *   When input.type is 'string', input.content is the html content.
 *   When input.type is 'path', input.content specify the path.
 *   The path can be a directory or a file.
 *
 * @param {Object} options
 * @param {boolean} [options.generateFiles=false]
 * @param {string}  [options.outputPath='./components']
 * @param {boolean} [options.recursive=false]
 *   When it is true, reacterminator will find .html files recursivly
 *   and convert all to them into react components.
 *   When it is false, reacterminator will only find the .html files
 *   in the current directory.
 * @param {boolean} [options.overrideFiles=false]
 *   When it is true reacterminator will override files it there
 *   is already a file in the output directory.
 * @param {boolean} [options.changeLinksForParamStore]
 *   Internally used by poetic
 * @return {Object.<string, Component>}
 *
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
    throw new Error(
      'No components are detected, please specify data-component-name' +
      'on the tags you want as a component'
    )
  }

  // Create App conpoments and Container components
  addContainers(mergedFileSnippets)
  var formattedFileSnippets = _.mapValues(mergedFileSnippets, formatFileSnippet)

  // create files
  if (options.generateFiles) {
    generateFiles(formattedFileSnippets, options)
  }

  return formattedFileSnippets
}

/**
 * Convert html to multiple react components.
 * This function accepts one html string.
 * This function use the following pipes to process string snippets
 * {@link htmlToHtmlSnippets}
 * {@link htmlSnippetToJsxSnippet}
 * {@link addDeclaration}
 * {@link addImportAndExport}
 * {@link formatFileSnippet}
 *
 * @param {String} htmlString
 * @param {Object} options same options as reacterminator
 * @return {Object.<string, Component>}
 */
function htmlToReact (htmlString, options) {
  var snippets = htmlToHtmlSnippets(htmlString)
  var jsxSnippets = _.mapValues(snippets, function (snippet) {
    return htmlSnippetToJsxSnippet(snippet, options)
  })
  var declarationSnippets = _.mapValues(jsxSnippets, addDeclaration)
  var fileSnippets = _.mapValues(declarationSnippets, addImportAndExport)

  return fileSnippets
}
