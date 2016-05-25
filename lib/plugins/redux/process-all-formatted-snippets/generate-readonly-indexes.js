const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const generateFile = require('../../../helpers/generate-file')

const INDEX_TEMPLATE = `\
REACTERMINATOR_PLACEHOLDER_IMPORT

export default {
REACTERMINATOR_PLACEHOLDER_IMPORTED_CONSTENTS
}
`

module.exports = function generateReadonlyIndexes (folderPath) {
  // readonly-index for each path file
  const subFolderPaths = getDirectories(folderPath)

  subFolderPaths.forEach((subFolderPath) => {
    const fileNames = getFileNames(path.resolve(folderPath, subFolderPath))
    const imports = fileNames
      .map((fileName) => `import ${_.camelCase(fileName)} from './${fileName}';`)
      .join('\n')

    const importedConstants = fileNames.map(_.camelCase).join(',\n')

    const content = INDEX_TEMPLATE
      .replace('REACTERMINATOR_PLACEHOLDER_IMPORT', imports)
      .replace('REACTERMINATOR_PLACEHOLDER_IMPORTED_CONSTENTS', importedConstants)

    generateFile({
      filePath: path.resolve(folderPath, subFolderPath, 'readonly-index.js'),
      content,
      override: true
    })
  })

  // readonly-index for all path files
  const imports = subFolderPaths
    .map((fileName) => `import ${_.camelCase(fileName)} from './${fileName}/readonly-index';`)
    .join('\n')

  const importedConstants = subFolderPaths.map(_.camelCase).join(',\n')

  const content = INDEX_TEMPLATE
    .replace('REACTERMINATOR_PLACEHOLDER_IMPORT', imports)
    .replace('REACTERMINATOR_PLACEHOLDER_IMPORTED_CONSTENTS', importedConstants)

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
