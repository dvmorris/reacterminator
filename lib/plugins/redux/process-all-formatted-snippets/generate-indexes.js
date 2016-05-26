const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const generateFile = require('../../../helpers/generate-file')

module.exports = function generateIndexes ({folderPath, type}) {
  // index for each path file
  const subFolderPaths = getDirectories(folderPath)

  subFolderPaths.forEach((subFolderPath) => {
    const fileNames = getFileNames(path.resolve(folderPath, subFolderPath))

    generateIndex({
      filePath: path.resolve(folderPath, subFolderPath, 'index.js'),
      type,
      pathNames: fileNames
    })
  })

  // index for all path files
  generateIndex({
    filePath: path.resolve(folderPath, 'index.js'),
    type,
    pathNames: subFolderPaths,
    importSuffix: '/index'
  })
}

function generateIndex ({filePath, type, pathNames, importSuffix}) {
  importSuffix = importSuffix || ''

  const imports = pathNames
    .map((fileName) => `import ${_.camelCase(fileName)} from './${fileName}${importSuffix}';`)
    .join('\n')

  const constants = pathNames.map(_.camelCase).join(',\n')

  const content = createIndexContent({
    type: type + (pathNames.length === 0 ? '.empty' : ''),
    imports,
    constants
  })

  generateFile({filePath, content})
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

function createIndexContent ({type, imports, constants}) {
  switch (type) {
    case 'action-type-constants':
    case 'action-creators':
      return `\
${imports}

export default {
${constants}
}
`
    case 'reducers':
      return `\
import { combineReducers } from 'redux';
${imports}

export default combineReducers({
${constants}
})
`
    case 'reducers.empty':
      return `\
export default (state = {}) => (state);
`
  }
}
