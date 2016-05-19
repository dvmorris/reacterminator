// TODO: move this into main, since we use this in main instead of plugins
const extractAttrValueByNameFromAstNode = require('../../helpers/extract-attr-value-by-name-from-ast-node')

module.exports = function processJsx ({component, ast}) {
  const customAttribute = extractAttrValueByNameFromAstNode(
    ast.program.body[0].expression,
    'data-component-custom'
  )
  component.plugins['custom-components'].isCustom = Boolean(customAttribute)

  return {component, ast}
}
