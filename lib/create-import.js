const _ = require('lodash')

module.exports = function createImport (
  {component, components, options, processName = 'processImport'}
) {
  const importReact = `import React from 'react';\n`

  const importCustom = _(component.imports)
    .split(';')
    .map(_.trim)
    .filter()
    .map(function (importString) {
      return `${importString};\n`
    })
    .join('')

  const importComponents = _(component.dependencies)
    .map(function (componentName) {
      const isCustom = _.get(
        components[componentName],
        'plugins.custom-components.isCustom'
      )

      return isCustom
        ? `import ${componentName} from '../custom-components/${componentName}';\n`
        : `import ${componentName} from './${componentName}';\n`
    })
    .join('')

  const {importSnippet} = options.pipThroughPlugins(
    processName,
    {
      component: component,
      importSnippet: importReact + importCustom + importComponents
    }
  )

  return importSnippet + '\n'
}
