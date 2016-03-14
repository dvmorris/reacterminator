module.exports = htmlSnippetToJsxSnippet

var parser = require('babylon')
var parse = function (string) {
  return parser.parse(string, {plugins: ['jsx']})
}
var generate = require('babel-generator').default

function htmlSnippetToJsxSnippet (component) {
  // TODO: html attrs to react attrs
  // - class -> className
  // - for -> htmlFor
  // - style

  var reactClassStringTemplate =
    'var ' + component.name + ' = React.createClass({\n' +
    '  render: function () {\n' +
    '    return (HTML_PLACEHOLDER);\n' +
    '  }\n' +
    '});'

  var reactClassString = reactClassStringTemplate
    .replace('HTML_PLACEHOLDER', component.htmlSnippet)

  component.jsxSnippet = generate(parse(reactClassString)).code
  return component
}
