function getExport (component, {pipThroughPlugins}) {
  const {exportSnippet, exportName} = pipThroughPlugins('processExport', {
    component: component,
    exportName: component.name,
    exportSnippet: ''
  })

  return exportSnippet + `\nexport default ${exportName};\n`
}

module.exports = getExport
