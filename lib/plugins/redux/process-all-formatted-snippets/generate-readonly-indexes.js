const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const generateFile = require('../../../helpers/generate-file')

module.exports = function generateReadonlyIndexes ({folderPath, type}) {
  // readonly-index for each path file
  const subFolderPaths = getDirectories(folderPath)

  subFolderPaths.forEach((subFolderPath) => {
    const fileNames = getFileNames(path.resolve(folderPath, subFolderPath))

    generateReadonlyIndex({
      filePath: path.resolve(folderPath, subFolderPath, 'readonly-index.js'),
      type,
      pathNames: fileNames
    })
  })

  // readonly-index for all path files
  generateReadonlyIndex({
    filePath: path.resolve(folderPath, 'readonly-index.js'),
    type,
    pathNames: subFolderPaths,
    importSuffix: '/readonly-index'
  })
}

function generateReadonlyIndex ({filePath, type, pathNames, importSuffix}) {
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
