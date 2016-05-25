const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const generateFile = require('../../../helpers/generate-file')

module.exports = function generateReadonlyIndexes (folderPath) {
  // readonly-index for each path file
  const subFolderPaths = getDirectories(folderPath)

  subFolderPaths.forEach((subFolderPath) => {
    const content = getFileNames(path.resolve(folderPath, subFolderPath))
      .map((fileName) => `export { default as ${_.camelCase(fileName)} } from './${fileName}';\n`)
      .join('')

    generateFile({
      filePath: path.resolve(folderPath, subFolderPath, 'readonly-index.js'),
      content,
      override: true
    })
  })

  // readonly-index for all path files
  const content = subFolderPaths
    .map((subFolderPath) => `export { default as ${_.camelCase(subFolderPath)} } from './${subFolderPath}/readonly-index.js';\n`)
    .join('')

  generateFile({
    filePath: path.resolve(folderPath, 'readonly-index.js'),
    content,
    override: true
  })
}

function getDirectories (dir) {
  return fs
    .readdirSync(dir)
    .filter((subDir) => fs.statSync(path.resolve(dir, subDir)).isDirectory())
}

function getFileNames (dir) {
  return fs
    .readdirSync(dir)
    .filter((subDir) => fs.statSync(path.resolve(dir, subDir)).isFile())
    .map((name) => path.parse(name).name)
}
