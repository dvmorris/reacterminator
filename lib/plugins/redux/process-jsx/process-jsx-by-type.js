const _ = require('lodash')
const assignProps = require('../../../helpers/assign-props')

module.exports = function processJsxByType ({component, node, type, id}) {
  return jsxProcessor[type]({component, node, type, id})
}

const jsxProcessor = {
  'input[type=text]': ({
    component,
    node,
    type,
    id
  }) => {
    const nodeState = formatPath('state', component.componentName, id)
    const nodeAction = formatPath('action', component.componentName, ['change', id])

    assignProps({
      node,
      props: {
        value: propByKey(nodeState),
        onChange: propByKey(nodeAction)
      }
    })

    return {nodeState, nodeAction}
  },

  'button': ({component, node, type, id}) => {
    const nodeAction = formatPath('action', component.componentName, ['click', id])

    assignProps({
      node,
      props: {
        onClick: propByKey(nodeAction)
      }
    })

    return {nodeAction}
  },

  'form': ({component, node, type, id}) => {
    const nodeAction = formatPath('action', component.componentName, ['submit', id])

    assignProps({
      node,
      props: {
        onSubmit: propByKey(nodeAction)
      }
    })

    return {nodeAction}
  }
}

function propByKey (key) {
  return `{this.props['${key}']}`
}

function formatPath (...keys) {
  return _(keys)
    .map((key) => {
      if (_.isArray(key)) {
        key = key.join('-')
      }

      return _.camelCase(key)
    })
    .join('.')
}
