const _ = require('lodash')

module.exports = function createImport (
  component, {pipThroughPlugins}, processName='processImport'
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
      return `import ${componentName} from './${componentName}';\n`
    })
    .join('')

  const {importSnippet} = pipThroughPlugins(processName, {
    component: component,
    importSnippet: importReact + importCustom + importComponents
  })

  return importSnippet + '\n'
}


