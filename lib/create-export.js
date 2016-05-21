module.exports = function createExport (
  {component, components, options, processName}
) {
  processName = processName || 'processExport'

  const {exportSnippet, exportName} = options.pipThroughPlugins(
    processName,
    {
      component,
      components,
      exportName: component.componentName,
      exportSnippet: ''
    }
  )

  return exportSnippet + `\nexport default ${exportName};\n`
}
