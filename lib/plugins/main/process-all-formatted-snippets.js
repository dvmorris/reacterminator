const _ = require('lodash')
const chalk = require('chalk')
const shell = require('shelljs')
const ensurePathExist = require('../../helpers/ensure-path-exist')
const generateFile = require('../../helpers/generate-file')
const logTask = require('../../helpers/log-task')

module.exports = function processAllFormattedSnippets ({component, components, options}) {
  if (!options.generateFiles) {
    return {component, components, options}
  }

  const readonlyComponents = _.omitBy(components, checkIsCustom)
  const readonlyComponentsPath = `${options.outputPath}/readonly-components`
  shell.exec(`rm -rf ${readonlyComponentsPath}`)

  createComponentFiles({
    components: readonlyComponents,
    outputPath: readonlyComponentsPath
  })

  const customComponents = _.pickBy(components, checkIsCustom)
  const customComponentsPath = `${options.outputPath}/custom-components`

  createComponentFiles({
    components: customComponents,
    outputPath: customComponentsPath
  })

  return {component, components, options}
}

function checkIsCustom (component) {
  return _.get(component, 'plugins.custom-components.isCustom')
}

function createComponentFiles ({components, outputPath}) {
  const componentsType = /readonly-components$/.test(outputPath)
    ? 'readonly'
    : 'custom'

  logTask(`generate ${componentsType} components`)

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
  console.log(`${chalk.red.bold(generateFilesCount)} ${componentsType} components generated`)
}

function writeToFile ({component, outputPath}) {
  const {componentName, formattedFileSnippet: content} = component
  const filePath = `${outputPath}/${componentName}.jsx`
  return generateFile({filePath, content}) && componentName
}