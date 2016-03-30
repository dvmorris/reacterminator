module.exports = addRoutes

var _ = require('lodash')
var generateRoutes = require('./html-snippet-to-jsx-snippet/generate-routes')
var generateApp = require('./html-snippet-to-jsx-snippet/generate-app')

function addRoutes (jsxSnippets) {
  var routes = _.filter(jsxSnippets, 'routePath')

  if (routes.length) {
    jsxSnippets.Routes = generateRoutes(routes)
    jsxSnippets.App = generateApp()
  }

  return jsxSnippets
}
