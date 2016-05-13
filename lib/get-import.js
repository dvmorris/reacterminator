const _ = require('lodash')

function getImport (component, {pipThroughPlugins}) {
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
    .join('') + '\n'

  return pipThroughPlugins('processImport', {
    component: component,
    importSnippet: importReact + importCustom + importComponents
  }).importSnippet
}

module.exports = getImport
