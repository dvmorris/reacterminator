module.exports = addProps

var traverse = require('babel-traverse').default
var parse = require('../helpers/parse')
var extractAttrValueByNameFromAstNode = require('../helpers/extract-attr-value-by-name-from-ast-node')
var transplant = require('../helpers/transplant')

function addProps (component) {
  var root = component.ast.program.body[0].expression

  traverse(component.ast, {
    JSXElement: function (nodePath) {
      var node = nodePath.node

      var props = extractAttrValueByNameFromAstNode(node, 'data-component-props')
      if (!props) {
        return
      }

      if (node === root) {
        return
      }

      var divWithPropsAst = parse('<div ' + props + '></div>')

      transplant(node, divWithPropsAst, 'openingElement.attributes')
    }
  })
}


