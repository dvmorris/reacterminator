module.exports = addDeclaration

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

function addDeclaration (component) {
  var reactClassString = REACT_CLASS_STRING_TEMPLATE
    .replace('PLACEHOLDER_COMPONENT_NAME', component.name)
    .replace('PLACEHOLDER_HTML', component.htmlSnippet)

  // this make sure the syntax is valid and the code is consistant
  component.declarationSnippet = generate(parse(reactClassString)).code

  return component
}
