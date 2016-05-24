const fs = require('fs')
const chalk = require('chalk')

module.exports = function generateFileIfNotExist ({filePath, content}) {
  let fileExists
  try {
    fileExists = fs.statSync(filePath).isFile()
  } catch (e) {
    fileExists = false
  }

  const shouldCreate = !fileExists

  if (shouldCreate) {
    fs.writeFileSync(filePath, content)
    console.log('CREATED: ' + chalk.green.underline(filePath))
  }

  return shouldCreate
}
