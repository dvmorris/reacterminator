module.exports = function createExport (
  component, {pipThroughPlugins}, processName='processExport'
) {
  const {exportSnippet, exportName} = pipThroughPlugins(processName, {
    component: component,
    exportName: component.name,
    exportSnippet: ''
  })

  return exportSnippet + `\nexport default ${exportName};\n`
}
