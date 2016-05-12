module.exports = addImportAndExport

var _ = require('lodash')

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
  component.fileSnippet =
    getImport(component.imports, component.dependencies) +
    component.declarationSnippet +
    '\nexport default ' + component.name + ';\n'

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
