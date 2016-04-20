module.exports = generateContainer

var CONTAINER_TEMPLATE =
  'import React from \'react\';\n' +
  'import { connect } from \'param-store\';\n' +
  'import REACTERMINATOR_PLACEHOLDER_COMPONENT from \'./REACTERMINATOR_PLACEHOLDER_COMPONENT\';\n' +
  '\n' +
  'class REACTERMINATOR_PLACEHOLDER_CONTAINER_COMPONENT extends React.Component {\n' +
  '  render() {\n' +
  '  const {path} = this.props.currentParams;' +
  '    if (REACTERMINATOR_PLACEHOLDER_CHECK_PATH) {\n' +
  '      return null;\n' +
  '    }\n' +
  '\n' +
  '    return <REACTERMINATOR_PLACEHOLDER_COMPONENT {...this.props}/>;\n' +
  '  }\n' +
  '}\n' +
  '\n' +
  'export default connect(REACTERMINATOR_PLACEHOLDER_CONTAINER_COMPONENT, \'path\');'

function generateContainer (component) {
  var containerName = component.name + 'Container'

  var checkPath = 'path !== \'' + component.path + '\''
  if (component.path === 'index') {
    checkPath += ' || path !== \'\''
  }

  var fileSnippet = CONTAINER_TEMPLATE
    .replace(
      /REACTERMINATOR_PLACEHOLDER_COMPONENT/g,
      component.name
    )
    .replace(
      /REACTERMINATOR_PLACEHOLDER_CONTAINER_COMPONENT/g,
      containerName
    )
    .replace(
      'REACTERMINATOR_PLACEHOLDER_CHECK_PATH',
      checkPath
    )

  return {
    name: containerName,
    fileSnippet: fileSnippet
  }
}
