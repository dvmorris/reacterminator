module.exports = addContainers

const _ = require('lodash')
const generateAppComponent = require('./add-containers/generate-app-component')
const generateContainer = require('./add-containers/generate-container')

function addContainers (fileSnippets, options) {
  options = options || {}
  if (!options.changeLinksForParamStore) {
    return fileSnippets
  }

  const containers = _.filter(fileSnippets, 'path')

  containers.forEach(function (component) {
    const container = generateContainer(component)
    fileSnippets[container.name] = container
  })

  if (containers.length) {
    fileSnippets.App = generateAppComponent(containers)
  }

  return fileSnippets
}
