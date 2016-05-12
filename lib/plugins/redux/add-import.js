var _ = require('lodash')

var importReduxConnect = 'import { connect as reduxConnect } from \'redux\';\n'

function addImport (importResult) {
  var component = importResult.component
  var importSnippet = importResult.importSnippet

  var state = _.get(component, 'plugins.redux.state')
  var action = _.get(component, 'plugins.redux.action')

  if (_.get(state, 'length') || _.get(action, 'length')) {
    importSnippet += importReduxConnect
  }

  return {
    component: component,
    importSnippet: importSnippet
  }
}

module.exports = addImport
