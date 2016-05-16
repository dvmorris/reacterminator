const _ = require('lodash')
const createImport = require('./create-import')
const createExport = require('./create-export')
const htmlSnippetToJsxSnippet = require('./html-snippet-to-jsx-snippet')
const addDeclaration = require('./add-declaration')

function addAppComponent (components, options) {
  const pathComponents = _.filter(components, 'path')

  const appComponent = {
    name: 'App',
    htmlSnippet: '<div></div>',
    dependencies: _.map(pathComponents, 'name')
  }

  const importSnippet = createImport(
    appComponent,
    options,
    'processAppImport'
  )

  htmlSnippetToJsxSnippet(
    appComponent,
    options,
    'processAppJsx',
    components
  )

  addDeclaration(appComponent, options)

  const declarationSnippet = appComponent.declarationSnippet

  const exportSnippet = createExport(
    {name: 'App'},
    options,
    'processAppExport'
  )

  return {
    name: 'App',
    fileSnippet: importSnippet + declarationSnippet + exportSnippet
  }
}

module.exports = addAppComponent
