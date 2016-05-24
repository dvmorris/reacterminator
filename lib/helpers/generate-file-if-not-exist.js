const fs = require('fs')

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
  }

  return shouldCreate
}
