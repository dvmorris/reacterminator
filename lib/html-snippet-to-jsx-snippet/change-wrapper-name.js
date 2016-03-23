module.exports = changeWrapperName

var _ = require('lodash')

function changeWrapperName (ast) {
  var node = ast.program.body[0].expression
  var attributes = node.openingElement.attributes

  var wrapperAttrIndex = _.findIndex(
    attributes,
    function (attribute) {
      return _.get(attribute, 'name.name') === 'data-component-wrapper'
    }
  )

  if (wrapperAttrIndex === -1) {
    return
  }

  var wrapperName = attributes[wrapperAttrIndex].value.value
  delete attributes[wrapperAttrIndex]

  // change tag names
  node.openingElement.name.name = wrapperName

  if (node.closingElement) {
    node.closingElement.name.name = wrapperName
  }
}
