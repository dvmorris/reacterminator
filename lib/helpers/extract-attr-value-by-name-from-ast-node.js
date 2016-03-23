module.exports = extractAttrValueByNameFromAstNode

var _ = require('lodash')

function extractAttrValueByNameFromAstNode (node, name) {
  var attributes = node.openingElement.attributes

  var attrIndex = _.findIndex(
    attributes,
    function (attribute) {
      return _.get(attribute, 'name.name') === name
    }
  )

  if (attrIndex === -1) {
    return
  }

  var attrValue = attributes[attrIndex].value.value
  delete attributes[attrIndex]

  return attrValue
}
