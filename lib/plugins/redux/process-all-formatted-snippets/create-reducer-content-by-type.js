const _ = require('lodash')

module.exports = function createReducerContentByType (
  {actionName, type, name, fromPath}
) {
  switch (type) {
    case 'change':
      return `\
import actionTypeConstants from '../action-type-constants/readonly-index.js';

export default function ${name}(state = '', action) {
  switch () {
    case actionTypeConstants.${_.camelCase(fromPath)}.${actionName}:
      return action.value;
    default:
      return state;
  }
}
`
    case 'click':
      return `\
import actionTypeConstants from '../action-type-constants/readonly-index.js';

export default function ${name}(state = '', action) {
  switch () {
    case actionTypeConstants.${_.camelCase(fromPath)}.${actionName}:
      return '';
    default:
      return state;
  }
}
`
    case 'submit':
      return `\
import actionTypeConstants from '../action-type-constants/readonly-index.js';

export default function ${name}(state = '', action) {
  switch () {
    case actionTypeConstants.${_.camelCase(fromPath)}.${actionName}:
      return '';
    default:
      return state;
  }
}
`
    default:
      throw new Error(`This action type is not recognized: ${type}`)
  }
}
