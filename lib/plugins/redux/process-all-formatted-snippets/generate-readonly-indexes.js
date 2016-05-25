const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const generateFile = require('../../../helpers/generate-file')

const templates = {
  constants: `\
REACTERMINATOR_PLACEHOLDER_IMPORT

export default {
REACTERMINATOR_PLACEHOLDER_IMPORTED_CONSTENTS
}
`,
  reducers: `\
import { combineReducers } from 'redux';
REACTERMINATOR_PLACEHOLDER_IMPORT

export default combineReducers({
REACTERMINATOR_PLACEHOLDER_IMPORTED_CONSTENTS
})
`,
  'reducers.empty': `\
export default (state = {}) => (state);
`
}

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
  const templateType = type + (pathNames.length === 0 ? '.empty' : '')
  const template = templates[templateType] || templates[type]

  importSuffix = importSuffix || ''

  const imports = pathNames
    .map((fileName) => `import ${_.camelCase(fileName)} from './${fileName}${importSuffix}';`)
    .join('\n')

  const importedConstants = pathNames.map(_.camelCase).join(',\n')

  const content = template
    .replace('REACTERMINATOR_PLACEHOLDER_IMPORT', imports)
    .replace('REACTERMINATOR_PLACEHOLDER_IMPORTED_CONSTENTS', importedConstants)

  generateFile({filePath, content, override: true})
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
