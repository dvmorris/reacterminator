const _ = require('lodash')

module.exports = function processJsx ({component, ast}) {
  const attributes = ast
    .program
    .body[0]
    .expression
    .openingElement
    .attributes

  const customAttribute = _.find(attributes, (attr) => {
    return _.get(attr, 'name.name') === 'data-component-custom'
  })

  component.plugins['custom-components'].isCustom = Boolean(customAttribute)

  return {component, ast}
}
