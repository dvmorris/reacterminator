module.exports = addDeclaration

var REACT_CLASS_STRING_TEMPLATE =
  'class REACTERMINATOR_PLACEHOLDER_COMPONENT_NAME extends React.Component {\n' +
  '  render() {\n' +
  'REACTERMINATOR_PLACEHOLDER_JS' +
  '    return (\n' +
  '      REACTERMINATOR_PLACEHOLDER_HTML\n' +
  '      );\n' +
  '  }\n' +
  '};\n'

function addDeclaration (component) {
  var reactClassString = REACT_CLASS_STRING_TEMPLATE
    .replace('REACTERMINATOR_PLACEHOLDER_COMPONENT_NAME', component.name)
    .replace('REACTERMINATOR_PLACEHOLDER_HTML', component.jsxSnippet)
    .replace('REACTERMINATOR_PLACEHOLDER_JS', getJsString(component))

  component.declarationSnippet = reactClassString

  return component
}

function getJsString (component) {
  var propsString = component.props
    ? 'const {' + component.props + '} = this.props;\n'
    : ''

  var stateString = component.state
    ? 'const {' + component.state + '} = this.state;\n'
    : ''

  var jsString = [propsString, stateString].join('')
  jsString += jsString ? '\n' : ''

  return jsString
}
