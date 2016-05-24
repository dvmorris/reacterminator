const _ = require('lodash')
const fs = require('fs')
const chalk = require('chalk')
const shell = require('shelljs')

module.exports = function processAllFormattedSnippets ({component, components, options}) {
  if (!options.generateFiles) {
    return {component, components, options}
  }

  const readonlyComponents = _.omitBy(components, checkIsCustom)
  const readonlyComponentsPath = `${options.outputPath}/readonly-components`
  shell.exec(`rm -rf ${readonlyComponentsPath}`)

  createComponentFiles({
    components: readonlyComponents,
    outputPath: readonlyComponentsPath,
    override: true
  })

  const customComponents = _.pickBy(components, checkIsCustom)
  const customComponentsPath = `${options.outputPath}/custom-components`

  createComponentFiles({
    components: customComponents,
    outputPath: customComponentsPath,
    override: false
  })

  return {component, components, options}
}

function checkIsCustom (component) {
  return _.get(component, 'plugins.custom-components.isCustom')
}

function createComponentFiles ({components, outputPath, override}) {
  // make sure outputPath folder exist
  ensurePathExist(outputPath)

  // generate files
  var generatedComponentNames = _(components)
    .map(function (component) {
      return writeToFile({component, outputPath, override})
    })
    .filter()
    .value()

  console.log('') // line break

  // NOTE: It seems this log is not very useful
  // // log removed code
  // _.each(generatedComponentNames, function (componentName) {
  //   // log all removed comments
  //   _.each(components[componentName].removedComments, function (comment) {
  //     logRemovedCode(componentName, 'comment', comment)
  //   })
  //   // log all removed script tags
  //   _.each(components[componentName].removedScriptTags, function (scriptTag) {
  //     logRemovedCode(componentName, 'script tag', scriptTag)
  //   })
  //   // log all removed style tags
  //   _.each(components[componentName].removedStyleTags, function (styleTag) {
  //     logRemovedCode(componentName, 'style tag', styleTag)
  //   })
  // })

  // log generated components
  const componentsType = override ? 'READONLY' : 'CUSTOM'
  console.log(`>  ---------- ${componentsType} COMPONENTS ----------`)
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

function ensurePathExist (outputPath) {
  let outputPathExists
  try {
    outputPathExists = fs.statSync(outputPath).isDirectory()
  } catch (e) {
    outputPathExists = false
  }

  if (!outputPathExists) {
    shell.exec(`mkdir -p ${outputPath}`)
  }
}

function writeToFile ({component, outputPath, override}) {
  const {componentName, formattedFileSnippet} = component
  const filePath = `${outputPath}/${componentName}.jsx`

  let fileExists
  try {
    fileExists = fs.statSync(filePath).isFile()
  } catch (e) {
    fileExists = false
  }

  if (fileExists && !override) {
    return
  } else {
    fs.writeFileSync(filePath, formattedFileSnippet)
    return componentName
  }
}

// function logRemovedCode (componentName, type, code) {
//   console.log(
//     '>  This ' +
//     type +
//     ' is removed from ' +
//     chalk.red.bold(componentName) + ':\n' +
//     '\n' +
//     code +
//     '\n'
//   )
// }
