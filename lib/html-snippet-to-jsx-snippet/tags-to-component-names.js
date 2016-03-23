module.exports = tagsToComponentNames

var _ = require('lodash')
var traverse = require('babel-traverse').default

function tagsToComponentNames (ast) {
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

      var componentName = node
        .openingElement
        .attributes[componentNameAttrIndex]
        .value
        .value

      node.openingElement.name.name = componentName
      if (node.closingElement) {
        node.closingElement.name.name = componentName
      }
    }
  })
}
