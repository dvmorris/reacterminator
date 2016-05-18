module.exports = reacterminator

const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const formatFileSnippet = require('./format-file-snippet')
const createAppComponent = require('./create-app-component')
const htmlToReact = require('./html-to-react')
const createPluginsAndPipline = require('./create-plugins-and-pipline')

function reacterminator ({type, content}, options) {
  // prepare options
  options = _.extend({outputPath: './reacterminator'}, options)
  options.outputPath = path.resolve(options.outputPath)

  // TODO: let user choose plugins
  const {plugins, pipThroughPlugins} = createPluginsAndPipline()
  options = _.extend({plugins, pipThroughPlugins}, options)

  var mergedFileSnippets = _.reduce(
    createHtmlFiles({type, content, recursive: options.recursive}),
    function (acc, {htmlFile, name}) {
      var htmlToReactOptions = _.extend({name}, options)
      return _.extend(acc, htmlToReact(htmlFile, htmlToReactOptions))
    },
    {}
  )

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

function createHtmlFiles ({type, content, recursive}) {
  // unify different input types
  if (type === 'path') {
    // unify different path types
    const absolutePath = path.resolve(content)
    const pathStat = fs.statSync(absolutePath)

    if (pathStat.isFile()) {
      return createHtmlFile(absolutePath)
    } else if (pathStat.isDirectory()) {
      const globPattern = recursive ? '/**/*.html' : '/*.html'
      return glob
        .sync(absolutePath + globPattern)
        .filter(function (fileName) {
          // TODO: do not filter them out,
          // instead do not create path compoent for them
          // filter out ignored files
          return !/ignore\.html$/.test(fileName)
        })
        .reduce(function (acc, path) {
          return _.extend(acc, createHtmlFile(path))
        }, {})
    } else {
      throw new Error(content + 'is not a file or directory')
    }
  } else if (type === 'string') {
    return {
      main: {
        fileName: 'main',
        htmlFile: content
      }
    }
  } else {
    throw new Error('the input.type should be "path" or "string", not "' + type + '"')
  }
}

function createHtmlFile (filePath) {
  const name = path.basename(filePath)
  return {
    [name]: {
      name,
      path: filePath,
      htmlFile: fs.readFileSync(filePath, 'utf8')
    }
  }
}
