const _ = require('lodash')

module.exports = function createActionCreatorContent (
  {actionId, actionType, actionName, fromPath}
) {
  switch (actionType) {
    case 'change':
    case 'click':
    case 'select':
    case 'submit':
      return `\
import actionTypeConstants from '../../action-type-constants/index';

export default function ${actionName}(event) {
  event.preventDefault();

  return {
    type: actionTypeConstants.${_.camelCase(fromPath)}.${actionName},
    value: event.target.value
  };
}
`
    // https://facebook.github.io/react/docs/forms.html#potential-issues-with-checkboxes-and-radio-buttons
    case 'check':
    case 'toggle':
    return `\
import actionTypeConstants from '../../action-type-constants/index';

export default function ${actionName}(event) {
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
