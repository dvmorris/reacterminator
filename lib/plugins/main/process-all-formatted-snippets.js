const _ = require('lodash')
const path = require('path')
const chalk = require('chalk')
const prepareFolder = require('../../helpers/prepare-folder')
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
  prepareFolder(outputPath)

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
  const {componentName, formattedFileSnippet} = component
  const filePath = `${outputPath}/${componentName}.jsx`
  generateFile({filePath, content: formattedFileSnippet})
  return componentName
}
