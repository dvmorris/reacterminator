const _ = require('lodash')
const assignProps = require('../../../helpers/assign-props')

module.exports = function processJsxByType ({component, node, type, id}) {
  if (/^input/.test(type)) {
    return processInputJsx({component, node, type, id})
  }

  switch (type) {
    case 'textarea':
      return processJsxByActionType({component, node, type, id, actionType: 'change'})

    case 'button':
      return processJsxByActionType({component, node, type, id, actionType: 'click'})

    case 'select':
      return processJsxByActionType({component, node, type, id, actionType: 'select'})

    case 'form':
      return processJsxByActionType({component, node, type, id, actionType: 'submit'})

    case 'a':
      return processJsxByActionType({component, node, type, id, actionType: 'click'})
  }
}

function processInputJsx ({component, node, type, id}) {
  switch (type) {
    case 'input[type=button]':
    case 'input[type=submit]':
      return processJsxByActionType({component, node, type, id, actionType: 'click'})

    case 'input[type=radio]':
    case 'input[type=checkbox]':
      return processJsxByActionType({component, node, type, id, actionType: 'check'})

    default:
      return processJsxByActionType({component, node, type, id, actionType: 'change'})
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
