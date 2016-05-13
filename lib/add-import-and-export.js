const getImport = require('./get-import')
const getExport = require('./get-export')

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
function addImportAndExport (component, options) {
  var importSnippet = getImport(component, options)
  var declarationSnippet = component.declarationSnippet
  var exportSnippet = getExport(component, options)

  component.fileSnippet = importSnippet + declarationSnippet + exportSnippet

  return component
}

module.exports = addImportAndExport
