var _ = require('lodash')

var ROUTES_TEMPLATE =
  'import React from \'react\';\n' +
  'REACTERMINATOR_PLACEHOLDER_IMPORTS' +
  '\n' +
  'export default class Routes extends React.Component {\n' +
  '  render() {\n' +
  '    return (\n' +
  '     <div>\n' +
  'REACTERMINATOR_PLACEHOLDER_ROUNTES' +
  '     </div>\n' +
  '    );\n' +
  '  }\n' +
  '}'

module.exports = function generateRoutes (containers) {
  var importsSnippets = _(containers)
    .map(function (route) {
      return 'import ' + route.name + 'Container' +
        ' from ' + '\'./' + route.name + 'Container' + '\';\n'
    })

  var routesSnippets = _(containers)
    .map(function (route) {
      return ' <' + route.name + 'Container' + '/>\n'
    })
    .join('')

  var fileSnippet = ROUTES_TEMPLATE
    .replace(
      'REACTERMINATOR_PLACEHOLDER_IMPORTS',
      importsSnippets
    )
    .replace(
      'REACTERMINATOR_PLACEHOLDER_ROUNTES',
      routesSnippets
    )

  var dependencies = _.map(containers, 'name')

  return {
    name: 'Routes',
    fileSnippet: fileSnippet,
    dependencies: dependencies
  }
}
