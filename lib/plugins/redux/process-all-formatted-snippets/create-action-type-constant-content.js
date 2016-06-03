const constCase = require('../../../helpers/const-case')

module.exports = function createActionTypeConstantContent ({fromPath, actionName}) {
  return `export default '${constCase(fromPath, actionName)}';\n`
}
