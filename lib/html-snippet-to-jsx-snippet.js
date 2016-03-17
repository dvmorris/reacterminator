module.exports = htmlSnippetToJsxSnippet

var _ = require('lodash')
var cheerio = require('cheerio')
var Attr = require('./attr')
var traverse = require('./helpers/traverse')
var babylon = require('babylon')
var parse = _.partial(babylon.parse, _, {plugins: ['jsx']})
var generate = require('babel-generator').default

function htmlSnippetToJsxSnippet (component) {
  var $ = cheerio.load(component.htmlSnippet, {normalizeWhitespace: true})
  var $root = $.root().children()

  var dependencies = []

  traverse($root, $, function ($node) {
    // replace attr names
    replaceAttrName($node, 'class', 'className')
    replaceAttrName($node, 'for', 'htmlFor')

    // replace html with react components
    var componentName = $node.data('component-name')
    if (componentName) {
      $node.get(0).tagName = componentName
      $node.empty()
      new Attr($node).removeAll()

      dependencies = _.union(dependencies, [componentName])
    }

    return componentName
  })

  component.dependencies = dependencies
  var jsxSnippetUnformatted = $root.toString()
  var jsxAst = parse(jsxSnippetUnformatted)
  component.jsxSnippet = generate(
    jsxAst,
    {sourceMaps: false},
    jsxSnippetUnformatted
  ).code

  return component
}

function replaceAttrName ($node, oldAttr, newAttr) {
  var attrValue = $node.attr(oldAttr)

  $node.removeAttr(oldAttr)

  if (attrValue) {
    $node.attr(newAttr, attrValue)
  }
}

// TODO: reused these code in another file
// NOTE: formatStyle produce escaped chars which we do not need,
// use these code in the ast level

// var traverse = require('babel-traverse').default;
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
