const _ = require('lodash')

module.exports = function createReducerContent (
  {actionId, actionType, actionName, fromPath}
) {
  switch (actionType) {
    case 'change':
      return `\
import actionTypeConstants from '../../action-type-constants/readonly-index';

export default function ${actionId}(state = '', action) {
  switch (action.type) {
    case actionTypeConstants.${_.camelCase(fromPath)}.${actionName}:
      return action.value;
    default:
      return state;
  }
}
`
    case 'click':
      return `\
import actionTypeConstants from '../../action-type-constants/readonly-index';

export default function ${actionId}(state = '', action) {
  switch (action.type) {
    case actionTypeConstants.${_.camelCase(fromPath)}.${actionName}:
      return '';
    default:
      return state;
  }
}
`
    case 'submit':
      return `\
import actionTypeConstants from '../../action-type-constants/readonly-index';

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
