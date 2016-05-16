const extractAttrValueByNameFromAstNode = require('../../helpers/extract-attr-value-by-name-from-ast-node')

function processJsx ({component, ast}) {
  const root = ast.program.body[0].expression

  const state = extractAttrValueByNameFromAstNode(root, 'data-component-redux-state')
  const action = extractAttrValueByNameFromAstNode(root, 'data-component-redux-action')

  if (state || action) {
    component.plugins.redux = {
      state: stringToArray(state),
      action: stringToArray(action)
    }
  }

  return {component, ast}
}

function stringToArray (string) {
  if (!string) {
    return []
  }

  return string.split(',').filter(Boolean)
}

module.exports = processJsx
