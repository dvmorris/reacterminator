const _ = require('lodash')

const importReduxConnect = `import { connect as reduxConnect } from 'react-redux';\n`
const importReduxAction = `import action from '../action-creators/index';\n`

function processImport ({component, importSnippet}) {
  const state = _.get(component, 'plugins.redux.state')
  const action = _.get(component, 'plugins.redux.action')

  if (_.get(state, 'length') || _.get(action, 'length')) {
    importSnippet += importReduxConnect
  }

  if (_.get(action, 'length')) {
    importSnippet += importReduxAction
  }

  return {component, importSnippet}
}

module.exports = processImport
