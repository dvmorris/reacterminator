module.exports = harvest

var _ = require('lodash')

function harvest (doner, organ) {
  return _.get(doner.program.body[0].expression, organ)
}
