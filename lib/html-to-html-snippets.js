const cheerio = require('cheerio')
const Attr = require('./attr')
const COMMENT_NODE_TYPE = 8
const upperCamelCase = require('./helpers/upper-camel-case')

module.exports = function htmlToHtmlSnippets ({htmlFile, htmlFiles, options}) {
  options = options || {}

  const {fileContent, fileName} = htmlFile

  const $ = cheerio.load(fileContent, { normalizeWhitespace: true })

  const htmlSnippets = {}

  if (options.fileToComponent) {
    const componentName = upperCamelCase(fileName)
    htmlSnippets[componentName] = elementToHtmlSnippet(
      $('body'),
      $,
      htmlSnippets,
      {
        componentName,
        wrapper: 'div',
        path: fileName,
        isPath: true, // NOTE: this is not used anywhere yet
        fromPath: fileName // NOTE: this is not used anywhere yet
      }
    )
  }

  $('[data-component-name]').each(function () {
    const htmlSnippet = elementToHtmlSnippet(
      $(this),
      $,
      htmlSnippets,
      {
        fromPath: fileName // NOTE: this is not used anywhere yet
      }
    )
    if (htmlSnippet) {
      htmlSnippets[htmlSnippet.componentName] = htmlSnippet
    }
  })

  return htmlSnippets
}

function elementToHtmlSnippet ($element, $, htmlSnippets, componentOptions) {
  // get all annotated attributes
  $element = $element.clone()

  const component = Object.assign(
    {},
    componentOptions,
    new Attr($element).extract()
  )

  const {componentName} = component

  // check component name , make sure it is camelcase
  if (!componentName) {
    throw new Error(
      `this component does not have a name: \n ${$element.toString()}`
    )
  } else if (!isUpperCamelCase(componentName)) {
    throw new Error(`\
this component name "${componentName}" is not upper camel case:
 ${$element.toString()}`
    )
  }

  // only override an existing component if the current is primary
  const isPrimary = component.primary
  const skipCurrentComponent = htmlSnippets[componentName] && !isPrimary
  if (skipCurrentComponent) {
    return
  }

  // remove comment, script and style
  component.removedComments = []
  component.removedScriptTags = []
  component.removedStyleTags = []
  $element
    .contents()
    .filter(function () {
      if (this.nodeType === COMMENT_NODE_TYPE) {
        component.removedComments.push($(this).toString())
        return true
      } else if ($(this).get(0).tagName === 'script') {
        component.removedScriptTags.push($(this).toString())
        return true
      } else if ($(this).get(0).tagName === 'style') {
        component.removedStyleTags.push($(this).toString())
        return true
      }
    })
    .remove()

  // convert element to string snippet
  component.htmlSnippet = $element.toString()

  return component
}

function isUpperCamelCase (string) {
  return !/[-_]/.test(string) && string[0] === string[0].toUpperCase()
}
