const _ = require('lodash')
const parse = require('../../helpers/parse')

const STACK_TEMPLATE = `\
<Stack index='path'>
  REACTERMINATOR_PLACEHOLDER_LAYERS
</Stack>
`

module.exports = function processAppJsx ({components, component, ast}) {
  const layersSnippet = _(components)
    .filter('path')
    .map(({componentName, path}) => `<${componentName} index='${path}' />`)
    .join('\n')

  const stackSnippet = STACK_TEMPLATE.replace(
    'REACTERMINATOR_PLACEHOLDER_LAYERS',
    layersSnippet
  )

  const newAst = parse(stackSnippet)

  return {component, ast: newAst}
}
