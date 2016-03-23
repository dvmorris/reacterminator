module.exports = parse

var babylon = require('babylon')

function parse (string) {
  return babylon.parse(string, {plugins: ['jsx']})
}
