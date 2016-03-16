module.exports = traverse

function traverse (node, $, callback) {
  callback(node)

  node.children().each(function (index, child) {
    traverse($(child), $, callback)
  })
}
