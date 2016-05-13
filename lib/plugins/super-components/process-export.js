const processAppExport = require('./process-app-export')

function processExport ({component, exportSnippet, exportName}) {
  if (component.name === 'App') {
    return processAppExport({component, exportSnippet, exportName})
  }

  return {component, exportSnippet, exportName}
}

module.exports = processExport

