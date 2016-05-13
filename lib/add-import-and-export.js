module.exports = addImportAndExport

var _ = require('lodash')
var redux = require('./plugins/redux')
const superComponents = require('./plugins/super-components')

/**
 * add import and export
 *
 * @example
 * // from:
 * export default ComponentA React.Component {
 *   render: function () {
 *     return <ComponentB/>
 *   }
 * }
 * // to:
 * import ComponentB from './ComponentB.jsx';
 *
 * class ComponentA extends React.Component {
 *   render: function () {
 *     return <ComponentB/>
 *   }
 * }
 *
 * export default ComponentA;
 *
 * @param {Component} component
 * @return {Component}
 */
function addImportAndExport (component) {
  var importSnippet = getImport(component)
  var declarationSnippet = component.declarationSnippet
  var exportSnippet = getExport(component)

  component.fileSnippet = importSnippet + declarationSnippet + exportSnippet

  return component
}

function getImport (component) {
  var importSnippet = 'import React from \'react\';\n'

  importSnippet += _(component.imports)
    .split(';')
    .map(_.trim)
    .filter()
    .map(function (importString) {
      return importString + ';\n'
    })
    .join('')

  importSnippet += _(component.dependencies)
    .map(function (componentName) {
      return 'import ' +
        componentName +
        ' from ' +
        "'./" + componentName + "'" +
        ';\n'
    })
    .join('') + '\n'

  var importResult = _({
    component: component,
    importSnippet: importSnippet
  }).thru(redux.processImport)
    .thru(superComponents.processImport)
    .value()

  return importResult.importSnippet
}

function getExport (component) {
  var exportResult = _({
    component: component,
    exportName: component.name,
    exportSnippet: ''
  }).thru(redux.processExport)
    .value()

  var exportSnippet = exportResult.exportSnippet
  var exportName = exportResult.exportName

  return exportSnippet + '\nexport default ' + exportName + ';\n'
}
