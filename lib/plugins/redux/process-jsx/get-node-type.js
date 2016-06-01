const _ = require('lodash')
const getAttrValueFromNode = require('../../../helpers/get-attr-value-from-node')

module.exports = function getNodeType (node) {
  const tagName = _.get(node, 'openingElement.name.name')

  switch (tagName) {
    case 'input':
      return getInputNodeType(node)
    case 'textarea':
    case 'button':
    case 'form':
    case 'select':
      return tagName
    case 'a':
      return getAnchorNodeType(node)
  }
}

function getInputNodeType (node) {
  const inputType = getAttrValueFromNode({node, attrName: 'type'}) || ''

  return 'input' + (inputType ? `[type=${inputType}]` : '')
}

function getAnchorNodeType (node) {
  const href = getAttrValueFromNode({node, attrName: 'href'})

  if (href === '#') {
    return 'a'
  }
}
