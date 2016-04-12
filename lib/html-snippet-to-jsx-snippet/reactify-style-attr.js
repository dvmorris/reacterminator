module.exports = reactifyStyleAttr

var _ = require('lodash')
var traverse = require('babel-traverse').default
var parse = require('../helpers/parse')
var upperCamelCase = require('../helpers/upper-camel-case')

function reactifyStyleAttr (component) {
  var ast = component.ast
  traverse(ast, {
    JSXElement: function (nodePath) {
      var attributes = nodePath.node.openingElement.attributes

      var styleAttributeIndex = _.findIndex(
        attributes,
        function (attribute) {
          return _.get(attribute, 'name.name') === 'style'
        }
      )

      if (styleAttributeIndex === -1) {
        return
      }

      // string
      var styleAttributeValue = formatStyle(
        attributes[styleAttributeIndex].value.value
      )
      var divWithSameStyleString =
        '<div style={{' + styleAttributeValue + '}}></div>'

      // ast
      var divWithSameStyleAst = parse(divWithSameStyleString)
      var formattedStyleAttribute = divWithSameStyleAst
        .program
        .body[0]
        .expression
        .openingElement
        .attributes[0]

      attributes[styleAttributeIndex] = formattedStyleAttribute
    }
  })
}

function formatStyle (style) {
  if (!_.trim(style)) {
    return ''
  }

  var formattedStyle = _(style.split(';'))
    .map(_.trim)
    .filter()
    .map(function (styleItem) {
      var styleItemArray = styleItem.split(':').map(_.trim)
      var styleItemName = formatStyleName(styleItemArray[0])
      var styleItemValue = styleItemArray[1]
      return styleItemName + ': ' + "'" + styleItemValue + "'"
    })
    .value()
    .join(', ')

  return formattedStyle
}

function formatStyleName (hyphenated) {
  var capitalizeFirst = hyphenated[0] === '-'
  return capitalizeFirst ? upperCamelCase(hyphenated) : _.camelCase(hyphenated)
}
