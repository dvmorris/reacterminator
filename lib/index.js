module.exports = reacterminator

const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const formatFileSnippet = require('./format-file-snippet')
const createAppComponent = require('./create-app-component')
const htmlToReact = require('./html-to-react')
const createPluginsAndPipline = require('./create-plugins-and-pipline')

function reacterminator (input, options) {
  // prepare options
  options = _.extend({outputPath: './reacterminator'}, options)
  options.outputPath = path.resolve(options.outputPath)

  // TODO: let user choose plugins
  const {plugins, pipThroughPlugins} = createPluginsAndPipline()
  options = _.extend({plugins, pipThroughPlugins}, options)

  // unify different input types
  var htmlStrings = []
  var fileNames = []
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
      // filter out ignored files
      htmlFiles = _.filter(htmlFiles, function (fileName) {
        return !/ignore\.html$/.test(fileName)
      })
    } else {
      throw new Error(input.content + 'is not a file or directory')
    }

    htmlStrings = htmlFiles.map(function (htmlFile) {
      return fs.readFileSync(htmlFile, 'utf8')
    })
    fileNames = htmlFiles.map(function (htmlFile) {
      return path.basename(htmlFile)
    })
  } else if (input.type === 'string') {
    htmlStrings = [input.content]
  } else {
    throw new Error('the input.type should be "path" or "string", not "' + input.type + '"')
  }

  var mergedFileSnippets = htmlStrings
    .reduce(function (fileSnippets, htmlString, index) {
      var htmlToReactOptions = _.extend({fileName: fileNames[index]}, options)
      return _.extend(fileSnippets, htmlToReact(htmlString, htmlToReactOptions))
    }, {})

  if (_.isEmpty(mergedFileSnippets)) {
    throw new Error(
      'No components are detected, please specify data-component-name' +
      'on the tags you want as a component'
    )
  }

  // Create App conpoments
  mergedFileSnippets.App = createAppComponent(mergedFileSnippets, options)

  var formattedFileSnippets = _.mapValues(mergedFileSnippets, formatFileSnippet)

  // create files
  if (options.generateFiles) {
    options.pipThroughPlugins(
      'processFormattedSnippets',
      {components: formattedFileSnippets, options}
    )
  }

  return formattedFileSnippets
}
