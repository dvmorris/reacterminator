const createImport = require('./create-import')
const createExport = require('./create-export')

module.exports = function addImportAndExport ({component, components, options}) {
  var importSnippet = createImport({component, components, options})
  var declarationSnippet = component.declarationSnippet
  var exportSnippet = createExport({component, components, options})

  component.fileSnippet = importSnippet + declarationSnippet + exportSnippet

  return component
}
