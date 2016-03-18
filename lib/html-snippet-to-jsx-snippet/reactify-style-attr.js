module.exports = reactifyStyleAttr

var _ = require('lodash')
var parse = _.partial(require('babylon').parse, _, {plugins: ['jsx']})
var traverse = require('babel-traverse').default

function reactifyStyleAttr (ast) {
  traverse(ast, {
    JSXElement: function (nodePath) {
      var openingElement = nodePath.node.openingElement

      var styleNode = _.find(
        openingElement.attributes,
        function (attribute) {
          return _.get(attribute, 'name.name') === 'style'
        }
      )

      if (!styleNode) {
        return
      }

      var divWithSameStyleString =
        '<div style={{' + formatStyle(styleNode.value.value) + '}}></div>'
      var divWithSameStyleAst = parse(divWithSameStyleString)
      var formattedStyleAttributes = divWithSameStyleAst
        .program
        .body[0]
        .expression
        .openingElement
        .attributes

      openingElement.attributes = formattedStyleAttributes
    }
  })

  return ast
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
  var camelCase = _.camelCase(hyphenated)
  if (capitalizeFirst) {
    camelCase = camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
  }

  return camelCase
}
