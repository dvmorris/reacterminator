module.exports = replaceInnerHtmlWithValueAttr

var _ = require('lodash')
var traverse = require('babel-traverse').default
var parse = require('../helpers/parse')

function replaceInnerHtmlWithValueAttr (ast) {
  traverse(ast, {
    JSXElement: function (nodePath) {
      var node = nodePath.node

      var attributes = node.openingElement.attributes

      var valueAttrIndex = _.findIndex(
        attributes,
        function (attribute) {
          return _.get(attribute, 'name.name') === 'data-component-value'
        }
      )

      if (valueAttrIndex === -1) {
        return
      }

      var divWithSameValueString =
        '<div>' + attributes[valueAttrIndex].value.value + '</div>'

      var divWithSameValueAst = parse(divWithSameValueString)

      node.children = divWithSameValueAst
        .program
        .body[0]
        .expression
        .children
    }
  })
}
