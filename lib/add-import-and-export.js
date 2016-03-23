module.exports = addImportAndExport

var _ = require('lodash')

function addImportAndExport (component) {
  component.fileSnippet =
    getImport(component.imports, component.dependencies) +
    'export default ' +
    component.declarationSnippet

  return component
}

function getImport (imports, dependencies) {
  var dependenciesString = 'import React from \'react\';\n'

  dependenciesString += _(imports)
    .split(';')
    .map(_.trim)
    .filter()
    .map(function (importString) {
      return importString + ';\n'
    })
    .join('')

  dependenciesString += _(dependencies)
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
