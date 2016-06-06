const _ = require('lodash')

module.exports = function createReducerContent (
  {actionId, actionType, actionName, fromPath}
) {
  switch (actionType) {
    case 'change':
    case 'select':
    case 'check':
      return `\
import actionTypeConstants from '../../action-type-constants/index';

export default function ${actionId}(state = '', action) {
  switch (action.type) {
    case actionTypeConstants.${_.camelCase(fromPath)}.${actionName}:
      return action.value;
    default:
      return state;
  }
}
`
    case 'toggle':
      return `\
import actionTypeConstants from '../../action-type-constants/index';

export default function ${actionId}(state = false, action) {
  switch (action.type) {
    case actionTypeConstants.${_.camelCase(fromPath)}.${actionName}:
      return !state;
    default:
      return state;
  }
}
`
    case 'click':
      return null
    case 'submit':
      return `\
import actionTypeConstants from '../../action-type-constants/index';

export default function ${actionId}(state = '', action) {
  switch (action.type) {
    case actionTypeConstants.${_.camelCase(fromPath)}.${actionName}:
      return '';
    default:
      return state;
  }
}
`
    default:
      throw new Error(`This action type is not recognized: ${actionType}`)
  }
}
