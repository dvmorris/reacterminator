const _ = require('lodash')
const path = require('path')
const chalk = require('chalk')
const ensurePathExist = require('../../helpers/ensure-path-exist')
const generateFile = require('../../helpers/generate-file')
const logTask = require('../../helpers/log-task')

module.exports = function processAllFormattedSnippets ({component, components, options}) {
  if (!options.generateFiles) {
    return {component, components, options}
  }

  createComponentFiles({
    components,
    outputPath: path.resolve(options.outputPath, 'components')
  })

  return {component, components, options}
}

function createComponentFiles ({components, outputPath}) {
  logTask('generate components')

  // make sure outputPath folder exist
  ensurePathExist(outputPath)

  // generate files
  var generateFilesCount = _(components)
    .map(function (component) {
      return writeToFile({component, outputPath})
    })
    .filter()
    .size()

  // log generated components
  console.log(`${chalk.red.bold(generateFilesCount)} components generated`)
}

function writeToFile ({component, outputPath}) {
  const {componentName, formattedFileSnippet: content} = component
  const filePath = `${outputPath}/${componentName}.jsx`
  return generateFile({filePath, content}) && componentName
}
