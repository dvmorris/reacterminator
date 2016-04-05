module.exports = addContainers

var _ = require('lodash')
var generateRoutes = require('./add-containers/generate-routes')
var generateContainer = require('./add-containers/generate-container')

function addContainers (fileSnippets) {
  var containers = _.filter(fileSnippets, 'path')

  containers.forEach(function (component) {
    var container = generateContainer(component)
    fileSnippets[container.name] = container
  })

  if (containers.length) {
    fileSnippets.Routes = generateRoutes(containers)
  }

  return fileSnippets
}
