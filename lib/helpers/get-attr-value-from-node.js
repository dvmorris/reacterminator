const _ = require('lodash')

module.exports = function getAttrValueFromNode ({node, attrName}) {
  const attrNode = _.find(
    node.openingElement.attributes,
    function (attribute) {
      return _.get(attribute, 'name.name') === attrName
    }
  )

  return _.get(attrNode, 'value.value')
}
