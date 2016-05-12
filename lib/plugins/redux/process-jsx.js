var extractAttrValueByNameFromAstNode = require('../../helpers/extract-attr-value-by-name-from-ast-node')

function processJsx (jsxResult) {
  var component = jsxResult.component
  var ast = jsxResult.ast

  var root = ast.program.body[0].expression

  var state = extractAttrValueByNameFromAstNode(root, 'data-component-redux-state')
  var action = extractAttrValueByNameFromAstNode(root, 'data-component-redux-action')

  if (state || action) {
    component.plugins.redux = {
      state: stringToArray(state),
      action: stringToArray(action)
    }
  }

  return {
    component: component,
    ast: ast
  }
}

function stringToArray (string) {
  if (!string) {
    return []
  }

  return string.split(',').filter(Boolean)
}

module.exports = processJsx
