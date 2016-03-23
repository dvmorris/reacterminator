module.exports = replaceInnerHtmlWithValueAttr

var traverse = require('babel-traverse').default
var parse = require('../helpers/parse')
var extractAttrValueByNameFromAstNode = require('../helpers/extract-attr-value-by-name-from-ast-node')
var transplant = require('../helpers/transplant')

function replaceInnerHtmlWithValueAttr (component) {
  traverse(component.ast, {
    JSXElement: function (nodePath) {
      var node = nodePath.node

      var value = extractAttrValueByNameFromAstNode(node, 'data-component-value')
      if (!value) {
        return
      }

      var divWithSameValueAst = parse('<div>' + value + '</div>')

      transplant(node, divWithSameValueAst, 'children')
    }
  })
}
