const fs = require('fs')
const chalk = require('chalk')
const eslintDisable = '/* eslint-disable */\n'
const isCustomFile = require('./is-custom-file')
// const _ = require('lodash')

module.exports = function generateFile ({filePath, content}) {
  const shouldOverride = !isCustomFile(filePath)

  if (shouldOverride) {
    fs.writeFileSync(filePath, eslintDisable + (content || ''))
    console.log('CREATED: ' + chalk.green.underline(filePath))
  }

  return shouldOverride
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
