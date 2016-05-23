module.exports = function traverse (node, $, callback) {
  if (callback(node)) {
    return
  }

  node.children().each(function (index, child) {
    traverse($(child), $, callback)
  })
}
