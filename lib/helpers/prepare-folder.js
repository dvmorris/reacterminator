const shell = require('shelljs')

module.exports = function prepareFolder (folderPath) {
  shell.rm('-rf', folderPath)
  shell.mkdir('-p', folderPath)
}
