const fs = require('fs')
const path = require('path')
const generateFileIfNotExist = require('../../../helpers/generate-file-if-not-exist')

module.exports = function processAllFormattedSnippets ({components, options}) {
  if (!options.generateFiles) {
    return {components, options}
  }

  // create store
  generateFileIfNotExist({
    filePath: path.resolve(options.outputPath, 'store.js'),
    content: fs.readFileSync(path.resolve(__dirname, 'templates/store.js'))
  })

  return {components, options}
}
