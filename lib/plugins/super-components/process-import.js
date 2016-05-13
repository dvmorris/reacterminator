const processAppImport = require('./process-app-import')

function processImport ({component, importSnippet}) {
  if (component.name === 'App') {
    return processAppImport({component, importSnippet})
  }

  return {component, importSnippet}
}

module.exports = processImport
