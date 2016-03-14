module.exports = htmlSnippetToJsxSnippet

var parser = require('babylon')
var parse = function (string) {
  return parser.parse(string, {plugins: ['jsx']})
}
var generate = require('babel-generator').default

var REACT_CLASS_STRING_TEMPLATE =
  'var PLACEHOLDER_COMPONENT_NAME = React.createClass({\n' +
  '  render: function () {\n' +
  '    return (PLACEHOLDER_HTML);\n' +
  '  }\n' +
  '});'

function htmlSnippetToJsxSnippet (component) {
  // TODO: html attrs to react attrs
  // - class -> className
  // - for -> htmlFor
  // - style

  var reactClassString = REACT_CLASS_STRING_TEMPLATE
    .replace('PLACEHOLDER_COMPONENT_NAME', component.name)
    .replace('PLACEHOLDER_HTML', component.htmlSnippet)

  component.jsxSnippet = generate(parse(reactClassString)).code
  return component
}
