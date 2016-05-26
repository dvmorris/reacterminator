const _ = require('lodash')

module.exports = function constCase (...keys) {
  return _(keys)
    .map(_.kebabCase)
    .map(_.toUpper)
    .map((key) => key.replace(/-/g, '_'))
    .join('_')
}
