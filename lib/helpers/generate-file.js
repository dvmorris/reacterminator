const fs = require('fs')
const chalk = require('chalk')
// const _ = require('lodash')

module.exports = function generateFile ({filePath, content}) {
  // const customImportPrefix = `\
// try { module.exports = require('${createCustomRelativePath(filePath)}'); return; } catch (e) {}\n
// `
  fs.writeFileSync(filePath, '' + content)
  console.log('CREATED: ' + chalk.green.underline(filePath))
}

// function createCustomRelativePath (filePath) {
//   const generatedFolders = [
//     'components',
//     'action-creators',
//     'action-type-constants',
//     'reducers'
//   ]

//   let relativeSegments = []
//   const isValidFilePath = _.find(filePath.split('/').reverse(), (segment) => {
//     relativeSegments.unshift(segment)
//     return _.includes(generatedFolders, segment)
//   })

//   if (!isValidFilePath) {
//     return ''
//   }

//   const relativePath = relativeSegments.join('/')
//   const depth = relativeSegments.length

//   const backUpPath = _.times(depth, _.constant('..')).join('/')
//   return `${backUpPath}/custom/${relativePath}`
// }
