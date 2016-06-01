const fs = require('fs')
const chalk = require('chalk')
const isCustomFile = require('./is-custom-file')

module.exports = function generateFile ({filePath, content}) {
  const shouldOverride = !isCustomFile(filePath)

  if (shouldOverride) {
    fs.writeFileSync(filePath, content)
    console.log('CREATED: ' + chalk.green.underline(filePath))
  }

  return shouldOverride
}
