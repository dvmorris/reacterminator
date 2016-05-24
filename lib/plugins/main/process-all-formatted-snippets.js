const _ = require('lodash')
const chalk = require('chalk')
const shell = require('shelljs')
const ensurePathExist = require('../../helpers/ensure-path-exist')
const generateFileIfNotExist = require('../../helpers/generate-file-if-not-exist')

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
  // make sure outputPath folder exist
  ensurePathExist(outputPath)

  // generate files
  var generatedComponentNames = _(components)
    .map(function (component) {
      return writeToFile({component, outputPath})
    })
    .filter()
    .value()

  // log generated components
  const componentsType = /readonly-components$/.test(outputPath)
    ? 'READONLY'
    : 'CUSTOM'
  console.log(`\n>  ---------- ${componentsType} COMPONENTS ----------`)
  console.log(
    '>  ' +
    chalk.red.bold(generatedComponentNames.length) +
    ' components are generated at ' +
    chalk.green.underline(outputPath)
  )

  // log info about each component
  _.each(generatedComponentNames, function (componentName) {
    // log all component names
    console.log('>  ' + chalk.red.bold(componentName))
  })
}

function writeToFile ({component, outputPath}) {
  const {componentName, formattedFileSnippet} = component
  const filePath = `${outputPath}/${componentName}.jsx`
  return generateFileIfNotExist({filePath, content: formattedFileSnippet}) &&
    componentName
}
