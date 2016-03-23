module.exports = removeAllAttrs

var traverse = require('babel-traverse').default

function removeAllAttrs (ast) {
  var root = ast.program.body[0].expression

  traverse(ast, {
    JSXElement: function (nodePath) {
      var node = nodePath.node

      if (node === root) {
        return
      }

      node.openingElement.attributes = []
    }
  })
}
