module.exports = addContainers

var _ = require('lodash')
var generateAppComponent = require('./add-containers/generate-app-component')
var generateContainer = require('./add-containers/generate-container')

function addContainers (fileSnippets, options) {
  options = options || {}
  if (!options.changeLinksForParamStore) {
    return fileSnippets
  }

  var containers = _.filter(fileSnippets, 'path')

  containers.forEach(function (component) {
    var container = generateContainer(component)
    fileSnippets[container.name] = container
  })

  if (containers.length) {
    fileSnippets.App = generateAppComponent(containers)
  }

  return fileSnippets
}
