var _ = require('lodash')

var REDUX_EXPORT_TEMPLATE =
  'const REACTERMINATOR_PLACEHOLDER_NEW_NAME = connect(\n' +
  'REACTERMINATOR_PLACEHOLDER_STATE' +
  'REACTERMINATOR_PLACEHOLDER_ACTION' +
  ')(REACTERMINATOR_PLACEHOLDER_NAME);\n'

function addExport (exportResult) {
  var component = exportResult.component
  var exportSnippet = exportResult.exportSnippet
  var exportName = exportResult.exportName

  var state = _.get(component, 'plugins.redux.state')
  var action = _.get(component, 'plugins.redux.action')

  if (_.get(state, 'length') || _.get(action, 'length')) {
    var newExportName = exportName + 'WithRedux'
    exportSnippet += REDUX_EXPORT_TEMPLATE
      .replace('REACTERMINATOR_PLACEHOLDER_NEW_NAME', newExportName)
      .replace('REACTERMINATOR_PLACEHOLDER_STATE', getState(state))
      .replace('REACTERMINATOR_PLACEHOLDER_ACTION', getAction(action))
      .replace('REACTERMINATOR_PLACEHOLDER_NAME', exportName)
  }

  return {
    component: component,
    exportSnippet: exportSnippet,
    exportName: newExportName || exportName
  }
}

function getState (state) {
  if (!_.get(state, 'length')) {
    return '  null,\n'
  }

  var MAP_STATE_TO_PROPS_TEMPLATE =
    '  (state) => (\n' +
    '    {\n' +
    '      REACTERMINATOR_PLACEHOLDER_STATE_MAP\n' +
    '    }\n' +
    '  ),\n'

  var stateMap = state.map(function (stateKey) {
    var stateKeyString = 'state.' + stateKey
    return '\'' + stateKeyString + '\': ' + stateKeyString
  }).join(',\n')

  return MAP_STATE_TO_PROPS_TEMPLATE
    .replace('REACTERMINATOR_PLACEHOLDER_STATE_MAP', stateMap)
}

function getAction (action) {
  if (!_.get(action, 'length')) {
    return '  {}\n'
  }

  var MAP_DISPATCH_TO_PROPS_TEMPLATE =
    '  {\n' +
    '    REACTERMINATOR_PLACEHOLDER_ACTION_MAP\n' +
    '  }\n'

  var actionMap = action.map(function (actionKey) {
    var actionKeyString = 'action.' + actionKey
    return '\'' + actionKeyString + '\': ' + actionKeyString
  }).join(',\n')

  return MAP_DISPATCH_TO_PROPS_TEMPLATE
    .replace('REACTERMINATOR_PLACEHOLDER_ACTION_MAP', actionMap)
}

module.exports = addExport
