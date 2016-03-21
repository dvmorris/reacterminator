module.exports = addImportAndExport

function addImportAndExport (component) {
  component.fileSnippet =
    getImport(component.dependencies) +
    'export default ' +
    component.declarationSnippet

  return component
}

function getImport (dependencies) {
  var dependenciesString = 'import React from \'react\';\n'

  dependenciesString += dependencies
    .map(function (componentName) {
      return 'import ' +
        componentName +
        ' from ' +
        "'./" + componentName + "'" +
        ';\n'
    })
    .join('')

  return dependenciesString + '\n'
}
