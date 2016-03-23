module.exports = formatFileSnippet

var chalk = require('chalk')
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
    console.log('\nOpsssss! The following snippet has ' + chalk.bold.red('SYNTAX') + ' errors:')
    console.log('---------------------------------')
    console.log(component.fileSnippet)
    console.log('---------------------------------')
    throw e
  }

  return component
}
