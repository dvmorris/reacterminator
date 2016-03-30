var _ = require('lodash')

module.exports = function generateRoutes (routes) {
  var routeSnippets = _(routes)
    .map(function (route) {
      return '      <Route path=\'' + route.routePath + '\' component={' + route.name + '}/>\n'
    })
    .join('')

  var jsxSnippet =
    '<Router>\n' +
    '   <Route path=\'/\' component={App}>\n' +
    routeSnippets +
    '   </Route>\n' +
    '</Router>'

  var dependencies = ['App'].concat(_.map(routes, 'name'))

  return {
    name: 'Routes',
    jsxSnippet: jsxSnippet,
    dependencies: dependencies
  }
}
