const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const generateFile = require('../../../helpers/generate-file')
const ensurePathExist = require('../../../helpers/ensure-path-exist')

module.exports = function processAllFormattedSnippets ({components, options}) {
  if (!options.generateFiles) {
    return {components, options}
  }

  // store
  generateFile({
    filePath: path.resolve(options.outputPath, 'store.js'),
    content: fs.readFileSync(path.resolve(__dirname, 'templates/store.js'))
  })

  // action-type-constants
  const actionTypeConstantsPath = path.resolve(
    options.outputPath,
    'action-type-constants'
  )

  ensurePathExist(actionTypeConstantsPath)

  _.each(components, ({fromPath, plugins}) => {
    const {redux: {action}} = plugins

    if (!fromPath) {
      return
    }

    ensurePathExist(path.resolve(
      options.outputPath,
      'action-type-constants',
      fromPath
    ))

    action.forEach((actionName) => {
      actionName = _.last(actionName.split('.'))

      generateFile({
        filePath: path.resolve(
          actionTypeConstantsPath,
          fromPath,
          `${_.kebabCase(actionName)}.js`
        ),
        content: `export default '${constCase(fromPath, actionName)}';\n`
      })
    })
  })

  // action-type-constants readonly-index for each path file
  const constantsPaths = getDirectories(actionTypeConstantsPath)
  constantsPaths.forEach((constantsPath) => {
    const content = getFileNames(path.resolve(actionTypeConstantsPath, constantsPath))
      .map(function (fileName) {
        return `export { default as ${_.camelCase(fileName)} } from './${fileName}';\n`
      })
      .join('')

    generateFile({
      filePath: path.resolve(
        actionTypeConstantsPath,
        constantsPath,
        'readonly-index.js'
      ),
      content
    })
  })
  // action-type-constants readonly-index for all path files
  const constantsIndexContent = constantsPaths
    .map((constantPath) => `export { default as ${constantPath} } from './${constantPath}/readonly-index.js';\n`)
    .join('')
  generateFile({
    filePath: path.resolve(
      actionTypeConstantsPath,
      'readonly-index.js'
    ),
    content: constantsIndexContent
  })

  // action-creators

  // reducers

  return {components, options}
}

function constCase (...keys) {
  return _(keys)
    .map(_.kebabCase)
    .map(_.toUpper)
    .map((key) => key.replace(/-/g, '_'))
    .join('_')
}

function getDirectories(dir) {
  return fs
    .readdirSync(dir)
    .filter(function(subDir) {
      return fs.statSync(path.join(dir, subDir)).isDirectory()
    })
}

function getFileNames (dir) {
  return fs
    .readdirSync(dir)
    .filter(function(subDir) {
      return fs.statSync(path.join(dir, subDir)).isFile()
    })
    .map((name) => {
      return path.parse(name).name
    })
}
