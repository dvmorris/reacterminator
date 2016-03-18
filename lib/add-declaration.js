module.exports = addDeclaration

// var parser = require('babylon')
// var parse = function (string) {
//   return parser.parse(string, {plugins: ['jsx']})
// }
// var generate = require('babel-generator').default

var REACT_CLASS_STRING_TEMPLATE =
  'class PLACEHOLDER_COMPONENT_NAME extends React.Component {\n' +
  '  render() {\n' +
  'PLACEHOLDER_PROP_JS' +
  'PLACEHOLDER_STATE_JS' +
  '    return (\n' +
  '      PLACEHOLDER_HTML\n' +
  '      );\n' +
  '  }\n' +
  '};\n'

function addDeclaration (component) {
  var reactClassString = REACT_CLASS_STRING_TEMPLATE
    .replace('PLACEHOLDER_COMPONENT_NAME', component.name)
    .replace('PLACEHOLDER_HTML', component.jsxSnippet)
    .replace('PLACEHOLDER_PROP_JS', (component.props ? 'const {' + component.props + '} = this.props;\n\n' : ''))
    .replace('PLACEHOLDER_STATE_JS', (component.state ? 'const {' + component.state + '} = this.state;\n\n' : ''))

  // NOTE: this make sure the syntax is valid and the code is consistant
  // generate(parse(reactClassString)).code
  component.declarationSnippet = reactClassString

  return component
}
