module.exports = addProps

const traverse = require('babel-traverse').default
const parse = require('../helpers/parse')
const extractAttrValueByNameFromAstNode = require('../helpers/extract-attr-value-by-name-from-ast-node')
const harvest = require('../helpers/harvest')

function addProps (component) {
  const root = component.ast.program.body[0].expression

  traverse(component.ast, {
    JSXElement: function (nodePath) {
      const node = nodePath.node

      const props = extractAttrValueByNameFromAstNode(node, 'data-component-props')
      if (!props) {
        return
      }

      if (node === root) {
        return
      }

      const divWithPropsAst = parse(`<div ${props}/>`)

      const propsAst = harvest(divWithPropsAst, 'openingElement.attributes')
      node.openingElement.attributes = node.openingElement.attributes.concat(propsAst)
    }
  })
}
