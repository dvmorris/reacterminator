module.exports = changeWrapperName

function changeWrapperName (component) {
  var node = component.ast.program.body[0].expression
  var wrapper = component.wrapper
  if (!wrapper) {
    return
  }

  // change tag names
  node.openingElement.name.name = wrapper

  if (node.closingElement) {
    node.closingElement.name.name = wrapper
  }
}
