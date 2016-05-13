const _ = require('lodash')

const REDUX_EXPORT_TEMPLATE =
  'const REACTERMINATOR_PLACEHOLDER_NEW_NAME = reduxConnect(\n' +
  'REACTERMINATOR_PLACEHOLDER_STATE' +
  'REACTERMINATOR_PLACEHOLDER_ACTION' +
  ')(REACTERMINATOR_PLACEHOLDER_NAME);\n'

function processExport ({component, exportSnippet, exportName}) {
  const state = _.get(component, 'plugins.redux.state')
  const action = _.get(component, 'plugins.redux.action')

  let newExportName

  if (_.get(state, 'length') || _.get(action, 'length')) {
    newExportName = exportName + 'WithRedux'
    exportSnippet += REDUX_EXPORT_TEMPLATE
      .replace('REACTERMINATOR_PLACEHOLDER_NEW_NAME', newExportName)
      .replace('REACTERMINATOR_PLACEHOLDER_STATE', getState(state))
      .replace('REACTERMINATOR_PLACEHOLDER_ACTION', getAction(action))
      .replace('REACTERMINATOR_PLACEHOLDER_NAME', exportName)
  }

  return {
    component,
    exportSnippet,
    exportName: newExportName || exportName
  }
}

function getState (state) {
  if (!_.get(state, 'length')) {
    return '  null,\n'
  }

  const MAP_STATE_TO_PROPS_TEMPLATE =
    '  (state) => ({\n' +
    '    REACTERMINATOR_PLACEHOLDER_STATE_MAP\n' +
    '  }),\n'

  const stateMap = state.map(function (stateKey) {
    const stateKeyString = 'state.' + stateKey
    return '\'' + stateKeyString + '\': ' + stateKeyString
  }).join(',\n')

  return MAP_STATE_TO_PROPS_TEMPLATE
    .replace('REACTERMINATOR_PLACEHOLDER_STATE_MAP', stateMap)
}

function getAction (action) {
  if (!_.get(action, 'length')) {
    return '  {}\n'
  }

  const MAP_DISPATCH_TO_PROPS_TEMPLATE =
    '  {\n' +
    '    REACTERMINATOR_PLACEHOLDER_ACTION_MAP\n' +
    '  }\n'

  const actionMap = action.map(function (actionKey) {
    const actionKeyString = 'action.' + actionKey
    return '\'' + actionKeyString + '\': ' + actionKeyString
  }).join(',\n')

  return MAP_DISPATCH_TO_PROPS_TEMPLATE
    .replace('REACTERMINATOR_PLACEHOLDER_ACTION_MAP', actionMap)
}

module.exports = processExport
