const ensurePathExist = require('./ensure-path-exist')
const cleanFolder = require('./clean-folder')

module.exports = function prepareFolder (folderPath) {
  ensurePathExist(folderPath)
  cleanFolder(folderPath)
}
