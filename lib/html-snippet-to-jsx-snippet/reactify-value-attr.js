module.exports = reactifyValueAttr

var _ = require('lodash')
var parse = _.partial(require('babylon').parse, _, {plugins: ['jsx']})
var traverse = require('babel-traverse').default

function reactifyValueAttr (ast) {
  traverse(ast, {
    JSXElement: function (nodePath) {
      var attributes = nodePath.node.openingElement.attributes
      // console.log(attributes, 'sanity test')

      var valueAttrIndex = _.findIndex(
        attributes,
        function (attribute) {
          return _.get(attribute, 'name.name') === 'data-component-value'
        }
      )
      // console.log(valueAttrIndex, 'index')

      if (valueAttrIndex === -1) {
        return
      }

      // string
      var attributeValue = attributes[valueAttrIndex].value.value
      delete attributes[valueAttrIndex]
      var divWithSameValueString =
        '<div>' + attributeValue + '</div>'

        // ast
        var divWithSameValueAst = parse(divWithSameValueString)
        var valueAttribute = divWithSameValueAst
        .program
        .body[0]
        .expression
        .children

        nodePath.node.children = valueAttribute
    }
  })

  return ast
}
