module.exports = htmlSnippetToJsxSnippet

var cheerio = require('cheerio')
var traverse = require('./helpers/traverse')

function htmlSnippetToJsxSnippet (component) {
  var htmlSnippet = component.htmlSnippet
  var $ = cheerio.load(htmlSnippet)
  var $root = $.root().children()

  replaceAttrName($root, $, 'class', 'className')
  replaceAttrName($root, $, 'for', 'htmlFor')

  component.jsxSnippet = $root.toString()

  return component
}

function replaceAttrName ($root, $, oldAttr, newAttr) {
  traverse($root, $, function ($node) {
    var attrValue = $node.attr(oldAttr)

    $node.removeAttr(oldAttr)

    if (attrValue) {
      $node.attr(newAttr, attrValue)
    }
  })
}

// TODO: reused these code in another file
// NOTE: formatStyle produce escaped chars which we do not need,
// use these code in the ast level

// var _ = require('lodash')

// function formatStyle ($element) {
//   var style = $element.attr('style')

//   if (!_.trim(style)) {
//     return
//   }

//   var formattedStyle = _(style.split(';'))
//     .map(_.trim)
//     .filter()
//     .map(function (styleItem) {
//       var styleItemArray = styleItem.split(':').map(_.trim)
//       var styleItemName = formatStyleName(styleItemArray[0])
//       var styleItemValue = styleItemArray[1]
//       return styleItemName + ': ' + '"' + styleItemValue + "'"
//     })
//     .value()
//     .join(',')

//   $element.attr('style', '{{' + formattedStyle + '}}')
// }

// function formatStyleName (hyphenated) {
//   var camelCase = _.camelCase(hyphenated)
//   if (hyphenated[0] === '-') {
//     camelCase[0] = camelCase[0].toUpperCase()
//   }

//   return camelCase
// }
