const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const generateFile = require('../../../helpers/generate-file')
const prepareFolder = require('../../../helpers/prepare-folder')
const logTask = require('../../../helpers/log-task')
const generateIndexes = require('./generate-indexes')
const createActionTypeConstantContent = require('./create-action-type-constant-content')
const createReducerContent = require('./create-reducer-content')
const createActionCreatorContent = require('./create-action-creator-content')

module.exports = function processAllFormattedSnippets ({components, options}) {
  if (!options.generateFiles) {
    return {components, options}
  }

  // store
  generateReduxStore({options})
  // action-type-constants
  generateReduxFiles({type: 'action-type-constants', components, options})
  // action-creators
  generateReduxFiles({type: 'action-creators', components, options})
  // reducers
  generateReduxFiles({type: 'reducers', components, options})

  return {components, options}
}

function generateReduxStore ({options}) {
  logTask('generate store.js')

  generateFile({
    filePath: path.resolve(options.outputPath, 'store.js'),
    content: fs.readFileSync(path.resolve(__dirname, 'templates/store.js'))
  })
}

function generateReduxFiles ({type, components, options}) {
  logTask(`generate ${type}`)

  const folderPath = path.resolve(options.outputPath, type)

  prepareFolder(folderPath)

  _.each(components, ({isPath, fromPath, plugins}) => {
    const {redux: {action}} = plugins

    if (!isPath) {
      return
    }

    const subFolderPath = path.resolve(folderPath, fromPath)

    prepareFolder(subFolderPath)

    _.each(action, (actionName) => {
      actionName = _.last(actionName.split('.'))

      const filePath = path.resolve(
        folderPath,
        fromPath,
        createFileName({type, actionName})
      )
      const content = createContent({type, fromPath, actionName})

      content && generateFile({filePath, content})
    })
  })

  generateIndexes({folderPath, type})
}

function createFileName ({type, actionName}) {
  switch (type) {
    case 'action-type-constants':
    case 'action-creators':
      return `${_.kebabCase(actionName)}.js`
    case 'reducers':
      const {actionId} = getTypeAndName(actionName)
      return `${_.kebabCase(actionId)}.js`
  }
}

function createContent ({type, fromPath, actionName}) {
  const {actionId, actionType} = getTypeAndName(actionName)

  switch (type) {
    case 'action-type-constants':
      return createActionTypeConstantContent({fromPath, actionName})
    case 'action-creators':
      return createActionCreatorContent({
        actionId,
        actionType,
        actionName,
        fromPath
      })
    case 'reducers':
      return createReducerContent({
        actionId,
        actionType,
        actionName,
        fromPath
      })
  }
}

function getTypeAndName (actionName) {
  const actionNameSegments = _.kebabCase(actionName).split('-')
  const actionType = actionNameSegments.shift()
  const actionId = _.camelCase(actionNameSegments.join('-'))
  return {actionId, actionType}
}
