const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const generateFile = require('../../../helpers/generate-file')

const REDUCER_INDEX_TEMPLATE = `\
import { combineReducers } from 'redux';
REACTERMINATOR_PLACEHOLDER_IMPORT

export default combineReducers({
REACTERMINATOR_PLACEHOLDER_REDUCERS
})
`

module.exports = function generateReadonlyIndexesForReducers (folderPath) {
  // readonly-index for each path file
  const subFolderPaths = getDirectories(folderPath)

  subFolderPaths.forEach((subFolderPath) => {
    const fileNames = getFileNames(path.resolve(folderPath, subFolderPath))

    if (fileNames.length === 0) {
      generateFile({
        filePath: path.resolve(folderPath, subFolderPath, 'readonly-index.js'),
        content: 'export default (state) => (state);\n',
        override: true
      })
      return
    }

    const imports = fileNames
      .map((fileName) => `import ${_.camelCase(fileName)} from './${fileName}';`)
      .join('\n')

    const reducers = fileNames.map(_.camelCase).join(',\n')

    const content = REDUCER_INDEX_TEMPLATE
      .replace('REACTERMINATOR_PLACEHOLDER_IMPORT', imports)
      .replace('REACTERMINATOR_PLACEHOLDER_REDUCERS', reducers)

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

  const reducers = subFolderPaths.map(_.camelCase).join(',\n')

  const content = REDUCER_INDEX_TEMPLATE
    .replace('REACTERMINATOR_PLACEHOLDER_IMPORT', imports)
    .replace('REACTERMINATOR_PLACEHOLDER_REDUCERS', reducers)

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
