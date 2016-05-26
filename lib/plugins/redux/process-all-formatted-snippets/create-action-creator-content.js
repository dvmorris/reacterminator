const _ = require('lodash')

module.exports = function createActionCreatorContent (
  {actionId, actionType, actionName, fromPath}
) {
  switch (actionType) {
    case 'change':
    case 'click':
      return `\
import actionTypeConstants from '../../action-type-constants/readonly-index';

export default function ${actionName}(event) {
  return {
    type: actionTypeConstants.${_.camelCase(fromPath)}.${actionName},
    value: event.target.value
  };
}
`
    case 'submit':
      return `\
import actionTypeConstants from '../../action-type-constants/readonly-index';

export default function ${actionName}(event) {
  event.preventDefault();

  return {
    type: actionTypeConstants.${_.camelCase(fromPath)}.${actionName},
    value: event.target.value
  };
}
`
    default:
      throw new Error(`This action type is not recognized: ${actionType}`)
  }
}
