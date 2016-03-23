module.exports = removeComponentInnerHtml

var _ = require('lodash')
var traverse = require('babel-traverse').default

function removeComponentInnerHtml (component) {
  var ast = component.ast
  var root = ast.program.body[0].expression

  traverse(ast, {
    JSXElement: function (nodePath) {
      var node = nodePath.node

      if (node === root) {
        return
      }

      var componentNameAttrIndex = _.findIndex(
        node.openingElement.attributes,
        function (attribute) {
          return attribute.name.name === 'data-component-name'
        }
      )

      if (componentNameAttrIndex === -1) {
        return
      }

      node.children = []
    }
  })
}
