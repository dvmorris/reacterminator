const _ = require('lodash')

const REDUX_EXPORT_TEMPLATE = `\
const REACTERMINATOR_PLACEHOLDER_NEW_NAME = reduxConnect(
REACTERMINATOR_PLACEHOLDER_STATE
REACTERMINATOR_PLACEHOLDER_ACTION
)(REACTERMINATOR_PLACEHOLDER_NAME);
`

function processExport ({component, exportSnippet, exportName}) {
  const state = _.get(component, 'plugins.redux.state')
  const action = _.get(component, 'plugins.redux.action')

  if (_.get(state, 'length') || _.get(action, 'length')) {
    const newExportName = exportName + 'WithRedux'
    exportSnippet += REDUX_EXPORT_TEMPLATE
      .replace('REACTERMINATOR_PLACEHOLDER_NEW_NAME', newExportName)
      .replace('REACTERMINATOR_PLACEHOLDER_STATE', getState(state))
      .replace('REACTERMINATOR_PLACEHOLDER_ACTION', getAction(action))
      .replace('REACTERMINATOR_PLACEHOLDER_NAME', exportName)

    exportName = newExportName
  }

  return {
    component,
    exportSnippet,
    exportName
  }
}

function getState (state) {
  if (!_.get(state, 'length')) {
    return '  null,'
  }

  const MAP_STATE_TO_PROPS_TEMPLATE = `\
  (state) => ({
    REACTERMINATOR_PLACEHOLDER_STATE_MAP
  }),`

  const stateMap = state.map(function (stateKey) {
    return `'${stateKey}': ${stateKey}`
  }).join(',\n')

  return MAP_STATE_TO_PROPS_TEMPLATE
    .replace('REACTERMINATOR_PLACEHOLDER_STATE_MAP', stateMap)
}

function getAction (action) {
  if (!_.get(action, 'length')) {
    return '  {}'
  }

  const MAP_DISPATCH_TO_PROPS_TEMPLATE = `\
  {
    REACTERMINATOR_PLACEHOLDER_ACTION_MAP
  }`

  const actionMap = action.map(function (actionKey) {
    return `'${actionKey}': ${actionKey}`
  }).join(',\n')

  return MAP_DISPATCH_TO_PROPS_TEMPLATE
    .replace('REACTERMINATOR_PLACEHOLDER_ACTION_MAP', actionMap)
}

module.exports = processExport
