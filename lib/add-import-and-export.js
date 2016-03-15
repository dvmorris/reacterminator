module.exports = addImportAndExport

function addImportAndExport (component, options) {
  component.fileSnippet =
    getImport(component.dependencies, options.outputPath) +
    component.declarationSnippet + '\n\n' +
    getExport(component.name)

  return component
}

function getImport (dependencies, outputPath) {
  return dependencies
    .map(function (componentName) {
      return 'import ' +
        componentName +
        ' from ' +
        "'" + outputPath + '/' + componentName + '.jsx' + "'" +
        ';\n\n'
    })
    .join('')
}

function getExport (componentName) {
  return 'export default ' + componentName + ';'
}
