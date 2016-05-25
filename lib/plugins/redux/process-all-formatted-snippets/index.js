const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const generateFile = require('../../../helpers/generate-file')
const ensurePathExist = require('../../../helpers/ensure-path-exist')
const logTask = require('../../../helpers/log-task')
const generateReadonlyIndexes = require('./generate-readonly-indexes')
const generateReadonlyIndexesForReducers = require('./generate-readonly-indexes-for-reducers')
const createReducerContentByType = require('./create-reducer-content-by-type')

module.exports = function processAllFormattedSnippets ({components, options}) {
  if (!options.generateFiles) {
    return {components, options}
  }

  // store
  logTask('generate store.js')

  generateFile({
    filePath: path.resolve(options.outputPath, 'store.js'),
    content: fs.readFileSync(path.resolve(__dirname, 'templates/store.js'))
  })

  // action-type-constants
  logTask('generate action-type-constants')

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

    ensurePathExist(path.resolve(actionTypeConstantsPath, fromPath))

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

  generateReadonlyIndexes(actionTypeConstantsPath)

  // action-creators
  logTask('generate action-creators')

  const actionCreatorsPath = path.resolve(
    options.outputPath,
    'action-creators'
  )

  ensurePathExist(actionCreatorsPath)

  _.each(components, ({fromPath, plugins}) => {
    const {redux: {action}} = plugins

    if (!fromPath) {
      return
    }

    ensurePathExist(path.resolve(
      options.outputPath,
      'action-creators',
      fromPath
    ))

    action.forEach((actionName) => {
      actionName = _.last(actionName.split('.'))

      // TODO: generate different components depending on the action type
      generateFile({
        filePath: path.resolve(
          actionCreatorsPath,
          fromPath,
          `${_.kebabCase(actionName)}.js`
        ),
        content: `\
import actionTypeConstants from '../../action-type-constants/readonly-index';

export default function ${actionName}(event) {
  event.preventDefault();
  return {
    type: actionTypeConstants.${_.camelCase(fromPath)}.${actionName},
    value: event.target.value
  };
}
`
      })
    })
  })

  generateReadonlyIndexes(actionCreatorsPath)

  // reducers
  logTask('generate reducers')

  const reducersPath = path.resolve(
    options.outputPath,
    'reducers'
  )

  ensurePathExist(reducersPath)

  _.each(components, ({fromPath, plugins}) => {
    const {redux: {action}} = plugins

    if (!fromPath) {
      return
    }

    ensurePathExist(path.resolve(reducersPath, fromPath))

    action.forEach((actionName) => {
      actionName = _.last(actionName.split('.'))
      const actionNameSegments = _.kebabCase(actionName).split('-')
      const type = actionNameSegments.shift()
      const name = _.camelCase(actionNameSegments.join('-'))

      const content = createReducerContentByType({
        actionName,
        type,
        name,
        fromPath
      })

      generateFile({
        filePath: path.resolve(
          reducersPath,
          fromPath,
          `${_.kebabCase(name)}.js`
        ),
        content
      })
    })
  })

  generateReadonlyIndexesForReducers(reducersPath)

  return {components, options}
}

function constCase (...keys) {
  return _(keys)
    .map(_.kebabCase)
    .map(_.toUpper)
    .map((key) => key.replace(/-/g, '_'))
    .join('_')
}
