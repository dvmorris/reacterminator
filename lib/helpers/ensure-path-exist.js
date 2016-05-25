const fs = require('fs')
const shell = require('shelljs')

module.exports = function ensurePathExist (outputPath) {
  let outputPathExists
  try {
    outputPathExists = fs.statSync(outputPath).isDirectory()
  } catch (e) {
    outputPathExists = false
  }

  if (!outputPathExists) {
    shell.mkdir('-p', outputPath)
  }
}
