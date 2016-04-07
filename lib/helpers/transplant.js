module.exports = transplant

var _ = require('lodash')
var harvest = require('./harvest')

function transplant (donee, doner, organ) {
  _.set(donee, organ, harvest(doner, organ))
}
