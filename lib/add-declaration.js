const REACT_CLASS_STRING_TEMPLATE = `\
class REACTERMINATOR_PLACEHOLDER_COMPONENT_NAME extends React.Component {
  render() {
    return (
      REACTERMINATOR_PLACEHOLDER_HTML
      );
  }
};
`

module.exports = function addDeclaration ({component, components, options}) {
  const {componentName, jsxSnippet} = component

  const reactClassString = REACT_CLASS_STRING_TEMPLATE
    .replace('REACTERMINATOR_PLACEHOLDER_COMPONENT_NAME', componentName)
    .replace('REACTERMINATOR_PLACEHOLDER_HTML', jsxSnippet)

  component.declarationSnippet = reactClassString

  return component
}
