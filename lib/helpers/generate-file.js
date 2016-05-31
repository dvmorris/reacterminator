const fs = require('fs')
const chalk = require('chalk')
const eslintDisable = '/* eslint-disable */\n'

module.exports = function generateFile ({filePath, content}) {
  fs.writeFileSync(filePath, eslintDisable + content)
  console.log('CREATED: ' + chalk.green.underline(filePath))
  return true
}
