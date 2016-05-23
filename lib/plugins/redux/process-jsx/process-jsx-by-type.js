const _ = require('lodash')
const upperCamelCase = require('../../../helpers/upper-camel-case')

module.exports = function processJsxByType ({component, node, type, id}) {
  return jsxProcessor[type]({
    component,
    node,
    type,
    id,
    idCamelCase: _.camelCase(id),
    idUpperCamelCase: upperCamelCase(id)
  })
}

const jsxProcessor = {
  'input[type=text]': ({
    component,
    node,
    type,
    id,
    idCamelCase,
    idUpperCamelCase
  }) => {
    // TODO: value
    // TODO: onChange

    return {
      nodeState: `${idCamelCase}`,
      nodeAction: `change${idUpperCamelCase}`
    }
  },

  'button': ({
    component,
    node,
    type,
    id,
    idCamelCase,
    idUpperCamelCase
  }) => {
    // TODO: value
    // TODO: onClick

    return {
      nodeAction: `click${idUpperCamelCase}`
    }
  },

  'form': ({
    component,
    node,
    type,
    id,
    idCamelCase,
    idUpperCamelCase
  }) => {
    // TODO: value
    // TODO: onSubmit

    return {
      nodeAction: `submit${idUpperCamelCase}`
    }
  },
}
