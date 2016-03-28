module.exports = addDeclaration

var REACT_CLASS_STRING_TEMPLATE =
  'class REACTERMINATOR_PLACEHOLDER_COMPONENT_NAME extends React.Component {\n' +
  '  render() {\n' +
  '    return (\n' +
  '      REACTERMINATOR_PLACEHOLDER_HTML\n' +
  '      );\n' +
  '  }\n' +
  '};\n'

/**
 * add declaration block to a jsx snippet
 *
 * @example
 * // from:
 * <div></div>
 * // to:
 * var ComponentA = React.createClass({
 *   render: function () {
 *     return <div></div>
 *   }
 * })
 *
 * @param {Component} component
 * @return {Component}
 */
function addDeclaration (component) {
  var reactClassString = REACT_CLASS_STRING_TEMPLATE
    .replace('REACTERMINATOR_PLACEHOLDER_COMPONENT_NAME', component.name)
    .replace('REACTERMINATOR_PLACEHOLDER_HTML', component.jsxSnippet)

  component.declarationSnippet = reactClassString

  return component
}
