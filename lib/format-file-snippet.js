module.exports = formatFileSnippet

var chalk = require('chalk')
var esformatter = require('esformatter')
esformatter.register(require('esformatter-jsx'))
esformatter.register(require('esformatter-quotes'))
esformatter.register(require('esformatter-semicolons'))
esformatter.register(require('esformatter-eol-last'))

/**
 * format component snippet
 *
 * @example
 * // from:
 * var ComponentA = React.createClass({
 *   render: function () {
 *     return <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>
 *   }
 * })
 * export default ComponentA;`
 * to:
 * var ComponentA = React.createClass({
 *   render: function () {
 *     return (
 *     <ul>
 *       <li>Item 1</li>
 *       <li>Item 2</li>
 *       <li>Item 3</li>
 *       <li>Item 4</li>
 *       <li>Item 5</li>
 *     </ul>
 *     )
 *   }
 * })
 * export default ComponentA;`
 *
 * @param {Component} component
 * @return {Component}
 */
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
