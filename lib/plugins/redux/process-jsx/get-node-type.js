const _ = require('lodash')
const getAttrValueFromNode = require('../../../helpers/get-attr-value-from-node')

module.exports = function getNodeType (node) {
  const tagName = _.get(node, 'openingElement.name.name')

  switch (tagName) {
    case 'input':
      return getInputNodeType(node)
    case 'button':
    case 'form':
      return tagName
  }
}

function getInputNodeType (node) {
  const inputType = getAttrValueFromNode({node, attrName: 'type'}) || ''

  switch (inputType) {
    case '':
    case 'text':
      return 'input[type=text]'
  }
}
