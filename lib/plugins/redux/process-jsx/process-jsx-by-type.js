const _ = require('lodash')
const assignProps = require('../../../helpers/assign-props')

module.exports = function processJsxByType ({component, node, type, id}) {
  const actionType = getActionType(type)
  return processJsxByActionType({component, node, type, id, actionType})
}

function getActionType (type) {
  if (/^input/.test(type)) {
    return getActionTypeOfInput(type)
  }

  switch (type) {
    case 'textarea':
      return 'change'

    case 'button':
      return 'click'

    case 'select':
      return 'select'

    case 'form':
      return 'submit'

    case 'a':
      return 'click'
  }
}

function getActionTypeOfInput (type) {
  switch (type) {
    case 'input[type=button]':
    case 'input[type=submit]':
      return 'click'

    case 'input[type=radio]':
      return 'check'

    case 'input[type=checkbox]':
      return 'toggle'

    default:
      return 'change'
  }
}

function processJsxByActionType ({component, node, type, id, actionType}) {
  let nodeState
  let nodeAction

  switch (actionType) {
    case 'change':
      nodeState = formatPath('state', component.componentName, id)
      nodeAction = formatPath('action', component.componentName, ['change', id])

      assignProps({
        node,
        props: {
          value: propByKey(nodeState),
          onChange: propByKey(nodeAction)
        }
      })
      return {nodeState, nodeAction}

    case 'select':
      nodeState = formatPath('state', component.componentName, id)
      nodeAction = formatPath('action', component.componentName, ['select', id])

      assignProps({
        node,
        props: {
          selected: propByKey(nodeState),
          onChange: propByKey(nodeAction)
        }
      })
      return {nodeState, nodeAction}

    case 'check':
      nodeState = formatPath('state', component.componentName, id)
      nodeAction = formatPath('action', component.componentName, ['change', id])

      assignProps({
        node,
        props: {
          checked: propByKey(nodeState),
          onChange: propByKey(nodeAction)
        }
      })
      return {nodeState, nodeAction}

    case 'toggle':
      nodeState = formatPath('state', component.componentName, id)
      nodeAction = formatPath('action', component.componentName, ['toggle', id])

      assignProps({
        node,
        props: {
          checked: propByKey(nodeState),
          onChange: propByKey(nodeAction)
        }
      })
      return {nodeState, nodeAction}

    case 'click':
      nodeAction = formatPath('action', component.componentName, ['click', id])

      assignProps({
        node,
        props: {
          onClick: propByKey(nodeAction)
        }
      })
      return {nodeAction}

    case 'submit':
      nodeAction = formatPath('action', component.componentName, ['submit', id])

      assignProps({
        node,
        props: {
          onSubmit: propByKey(nodeAction)
        }
      })
      return {nodeAction}

    default:
      throw new Error(`This action type is not recognized: ${actionType}`)
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
