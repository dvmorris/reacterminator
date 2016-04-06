var _ = require('lodash')

var APP_TEMPLATE =
  'import React from \'react\';\n' +
  'REACTERMINATOR_PLACEHOLDER_IMPORTS' +
  '\n' +
  'export default class App extends React.Component {\n' +
  '  render() {\n' +
  '    return (\n' +
  '     <div>\n' +
  'REACTERMINATOR_PLACEHOLDER_ROUNTES' +
  '     </div>\n' +
  '    );\n' +
  '  }\n' +
  '}'

module.exports = function generateApp (containers) {
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

  var fileSnippet = APP_TEMPLATE
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
    name: 'App',
    fileSnippet: fileSnippet,
    dependencies: dependencies
  }
}
