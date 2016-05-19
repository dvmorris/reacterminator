const _ = require('lodash')
const createImport = require('./create-import')
const createExport = require('./create-export')
const htmlSnippetToJsxSnippet = require('./html-snippet-to-jsx-snippet')
const addDeclaration = require('./add-declaration')

function addAppComponent ({components, options}) {
  const dependencies = _(components)
    .filter('path')
    .map('componentName')
    .value()

  // Do not create component if there is no path
  if (dependencies.length === 0) {
    return components
  }

  const appComponent = {
    componentName: 'App',
    htmlSnippet: '<div></div>'
  }

  htmlSnippetToJsxSnippet({
    component: appComponent,
    components,
    options,
    processName: 'processAppJsx'
  })

  // NOTE: htmlSnippetToJsxSnippet is going to override the dependencies
  appComponent.dependencies = dependencies

  addDeclaration({
    component: appComponent,
    components,
    options
  })

  const importSnippet = createImport({
    component: appComponent,
    components,
    options,
    processName: 'processAppImport'
  })

  const {declarationSnippet} = appComponent

  const exportSnippet = createExport({
    component: appComponent,
    components,
    options,
    processName: 'processAppExport'
  })

  appComponent.fileSnippet = importSnippet + declarationSnippet + exportSnippet

  components['App'] = appComponent

  return components
}

module.exports = addAppComponent
