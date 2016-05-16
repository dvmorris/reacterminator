const _ = require('lodash')

const importReduxConnect = `import { connect as reduxConnect } from 'react-redux';\n`

function processImport ({component, importSnippet}) {
  const state = _.get(component, 'plugins.redux.state')
  const action = _.get(component, 'plugins.redux.action')

  if (_.get(state, 'length') || _.get(action, 'length')) {
    importSnippet += importReduxConnect
  }

  return {component, importSnippet}
}

module.exports = processImport
