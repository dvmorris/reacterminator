module.exports = changeWrapperName

function changeWrapperName (component) {
  var root = component.ast.program.body[0].expression
  var wrapper = component.wrapper
  if (!wrapper) {
    return
  }

  // change tag names
  root.openingElement.name.name = wrapper

  if (root.closingElement) {
    root.closingElement.name.name = wrapper
  }
}
