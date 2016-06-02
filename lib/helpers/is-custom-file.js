const shell = require('shelljs')

module.exports = function isCustomFile (file) {
  if (!shell.test('-f', file)) {
    return false
  }

  const firstLine = shell.head({'-n': 1}, file).stdout

  return firstLine !== '/* eslint-disable */\n'
}
