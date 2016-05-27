const shell = require('shelljs')
const path = require('path')
const isCustomFile = require('./is-custom-file')

module.exports = function cleanFolder (folderPath) {
  shell.ls('-R', folderPath).forEach((fileName) => {
    const filePath = path.resolve(folderPath, fileName)
    if (!isCustomFile(filePath) && shell.test('-f', filePath)) {
      shell.rm(filePath)
    }
  })
}
