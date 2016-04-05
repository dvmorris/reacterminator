module.exports = generateContainer

var CONTAINER_TEMPLATE =
  'import React from \'react\';\n' +
  'import { connect } from \'param-store\';\n' +
  'import REACTERMINATOR_PLACEHOLDER_COMPONENT from \'./REACTERMINATOR_PLACEHOLDER_COMPONENT\';\n' +
  '\n' +
  'class REACTERMINATOR_PLACEHOLDER_CONTAINER_COMPONENT extends React.Component {\n' +
  '  render() {\n' +
  '    const style = {position: \'absolute\'};\n' +
  '    if (this.props.currentParams.path !== \'REACTERMINATOR_PLACEHOLDER_PATH\') {\n' +
  '      return null;\n' +
  '    }\n' +
  '\n' +
  '    return (\n' +
  '      <div style={style}>\n' +
  '        <REACTERMINATOR_PLACEHOLDER_COMPONENT {...this.props}/>\n' +
  '      </div>\n' +
  '    );\n' +
  '  }\n' +
  '}\n' +
  '\n' +
  'export default connect(REACTERMINATOR_PLACEHOLDER_CONTAINER_COMPONENT, \'path\');'

function generateContainer (component) {
  var containerName = component.name + 'Container'

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
      'REACTERMINATOR_PLACEHOLDER_PATH',
      component.path
    )

  return {
    name: containerName,
    fileSnippet: fileSnippet
  }
}
