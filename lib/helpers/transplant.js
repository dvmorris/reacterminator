module.exports = transplant

var _ = require('lodash')

function transplant (donee, doner, organ) {
  _.set(
    donee,
    organ,
    _.get(doner.program.body[0].expression, organ)
  )
}
