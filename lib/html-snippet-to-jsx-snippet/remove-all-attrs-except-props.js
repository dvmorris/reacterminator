module.exports = removeAllAttrsExceptProps

var _ = require('lodash')
var traverse = require('babel-traverse').default

function removeAllAttrsExceptProps (component) {
  var ast = component.ast
  var root = ast.program.body[0].expression

  traverse(ast, {
    JSXElement: function (nodePath) {
      var node = nodePath.node

      if (node === root) {
        return
      }

      var propsAttribute = _.find(
        node.openingElement.attributes,
        function (attribute) {
          return _.get(attribute, 'name.name') === 'data-component-props'
        }
      )

      node.openingElement.attributes = propsAttribute ? [propsAttribute] : []
    }
  })
}
