const traverse = require('babel-traverse').default
const getNodeType = require('./get-node-type')
const processJsxByType = require('./process-jsx-by-type')
const getAttrValueFromNode = require('../../../helpers/get-attr-value-from-node')

module.exports = function processJsx ({component, ast}) {
  const state = []
  const action = []

  traverse(ast, {
    JSXElement: function ({node}) {
      const id = getAttrValueFromNode({node, attrName: 'id'})
      if (!id) {
        return
      }

      const type = getNodeType(node)
      if (!type) {
        return
      }

      const {nodeState, nodeAction} = processJsxByType({component, node, type, id})
      nodeState && state.push(nodeState)
      nodeAction && action.push(nodeAction)
    }
  })

  component.plugins.redux = {state, action}

  return {component, ast}
}
