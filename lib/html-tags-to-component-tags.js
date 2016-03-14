module.exports = htmlTagsToComponentTags

var _ = require('lodash')
var cheerio = require('cheerio')
var Attr = require('./attr')

function htmlTagsToComponentTags (component) {
  var $ = cheerio.load(component.htmlSnippet, {normalizeWhitespace: true})
  var $root = $.root()

  var dependencies = []

  var $childrenOfComponent = $root.children().children()
  $childrenOfComponent.each(function (index, child) {
    traverse($(child), $, function (node) {
      var $node = $(node)

      var componentName = $node.data('component-name')
      if (componentName) {
        $node.get(0).tagName = componentName
        $node.empty()
        new Attr($node).removeAll()

        dependencies = _.union(dependencies, [componentName])
      }

      return componentName
    })
  })

  component.htmlSnippet = $root.toString()
  component.dependencies = dependencies

  return component
}

function traverse (node, $, convertToComponent) {
  convertToComponent(node)

  node.children().each(function (index, child) {
    traverse($(child), $, convertToComponent)
  })
}
