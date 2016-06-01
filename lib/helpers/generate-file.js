const fs = require('fs')
const chalk = require('chalk')

module.exports = function generateFile ({filePath, content}) {
  fs.writeFileSync(filePath, content)
  console.log('CREATED: ' + chalk.green.underline(filePath))
}
