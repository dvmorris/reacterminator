module.exports = formatFileSnippet

var esformatter = require('esformatter');
var esformatterJsx = require('esformatter-jsx');

function formatFileSnippet (component) {
  var formatOptions = {
    plugins: ["esformatter-jsx"],
    jsx: {
      formatJSX: true,
      attrsOnSameLineAsTag: false, // move each attribute to its own line
      maxAttrsOnTag: 3, // if lower or equal than 3 attributes, they will be kept on a single line
      firstAttributeOnSameLine: true, // keep the first attribute in the same line as the tag
      alignWithFirstAttribute: false, // do not align attributes with the first tag
      spaceInJSXExpressionContainers: "",
    }
  }

  component.formattedFileSnippet = esformatter.format(
    component.fileSnippet,
    formatOptions
  )

  return component
}
