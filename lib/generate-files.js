module.exports = generateFiles

var _ = require('lodash')
var fs = require('fs')
var chalk = require('chalk')

function generateFiles (components, options) {
  // make sure outputPath folder exist
  ensurePathExist(options.outputPath)

  // generate files
  var generatedComponentNames = _(components)
    .map(function (component) {
      return writeToFile(component, options)
    })
    .filter()
    .value()

  console.log('') // line break

  // log removed code
  _.each(generatedComponentNames, function (componentName) {
    // log all removed comments
    components[componentName].removedComments.forEach(function (comment) {
      logRemovedCode(componentName, 'comment', comment)
    })
    // log all removed script tags
    components[componentName].removedScriptTags.forEach(function (scriptTag) {
      logRemovedCode(componentName, 'script tag', scriptTag)
    })
  })

  // log generated components
  console.log('>  ---------- COMPONENTS ----------')
  console.log(
    '>  ' +
    chalk.red.bold(generatedComponentNames.length) +
    ' components are generated at ' +
    chalk.green.underline(options.outputPath)
  )

  // log info about each component
  _.each(generatedComponentNames, function (componentName) {
    // log all component names
    console.log('>  ' + chalk.red.bold(componentName))
  })
}

function ensurePathExist (outputPath) {
  var outputPathExists
  try {
    outputPathExists = fs.statSync(outputPath).isDirectory()
  } catch (e) {
    outputPathExists = false
  }
  if (!outputPathExists) {
    fs.mkdirSync(outputPath)
  }
}

function writeToFile (component, options) {
  var filePath = options.outputPath + '/' + component.name + '.jsx'

  // check if the the file aready exists
  var fileExists
  try {
    fileExists = fs.statSync(filePath).isFile()
  } catch (e) {
    fileExists = false
  }

  if (fileExists) {
    var decoratedFileName = chalk.red.bold(component.name + '.jsx')
    if (!options.overrideFiles) {
      console.log(
        '>  ' +
        'Skipping file: ' +
        decoratedFileName
      )
      return
    } else {
      console.log(
        '>  ' +
        'Overriding file: ' +
        decoratedFileName
      )
    }
  }

  // write to file
  fs.writeFileSync(filePath, component.formattedFileSnippet)
  return component.name
}

function logRemovedCode (componentName, type, code) {
  console.log(
    '>  This ' +
    type +
    ' is removed from ' +
    chalk.red.bold(componentName) + ':\n' +
    '\n' +
    code +
    '\n'
  )
}
