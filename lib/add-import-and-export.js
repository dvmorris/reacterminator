module.exports = addImportAndExport

function addImportAndExport (component, options) {
  component.fileSnippet =
    getImport(component.dependencies, options.outputPath) +
    component.declarationSnippet +
    getExport(component.name)

  return component
}

function getImport (dependencies, outputPath) {
  if (dependencies.length === 0) {
    return ''
  }

  var dependenciesString = dependencies
    .map(function (componentName) {
      return 'import ' +
        componentName +
        ' from ' +
        "'" + outputPath + '/' + componentName + "'" +
        ';\n'
    })
    .join('')

  return dependenciesString + '\n'
}

function getExport (componentName) {
  return '\nexport default ' + componentName + ';\n'
}
