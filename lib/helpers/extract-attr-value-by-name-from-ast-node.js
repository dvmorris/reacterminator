const _ = require('lodash')

module.exports = function extractAttrValueByNameFromAstNode (node, name) {
  const attributes = node.openingElement.attributes

  const attrIndex = _.findIndex(
    attributes,
    function (attribute) {
      return _.get(attribute, 'name.name') === name
    }
  )

  if (attrIndex === -1) {
    return
  }

  const attrValue = attributes[attrIndex].value.value
  delete attributes[attrIndex]

  return attrValue
}
