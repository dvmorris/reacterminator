module.exports = formatFileSnippet

var esformatter = require('esformatter')
esformatter.register(require('esformatter-jsx'))
esformatter.register(require('esformatter-quotes'))
esformatter.register(require('esformatter-semicolons'))

function formatFileSnippet (component) {
  var formatOptions = {
    jsx: {
      formatJSX: true,
      attrsOnSameLineAsTag: false, // move each attribute to its own line
      maxAttrsOnTag: 3, // if lower or equal than 3 attributes, they will be kept on a single line
      firstAttributeOnSameLine: true, // keep the first attribute in the same line as the tag
      alignWithFirstAttribute: false, // do not align attributes with the first tag
      spaceInJSXExpressionContainers: ''
    },
    quotes: {
      type: 'single',
      avoidEscape: false
    }
  }

  try {
    component.formattedFileSnippet = esformatter.format(
      component.fileSnippet,
      formatOptions
    )
  } catch (e) {
    console.log('The following snippet has syntax error:')
    console.log(component.fileSnippet)
    throw e
  }

  return component
}
