const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const glob = require('glob')

module.exports = function createHtmlFiles ({type, content, recursive}) {
  // unify different input types
  if (type === 'path') {
    // unify different path types
    const absolutePath = path.resolve(content)
    const pathStat = fs.statSync(absolutePath)

    if (pathStat.isFile()) {
      return createHtmlFile(absolutePath)
    } else if (pathStat.isDirectory()) {
      const globPattern = recursive ? '/**/*.html' : '/*.html'
      return glob
        .sync(absolutePath + globPattern)
        .filter(function (fileName) {
          // TODO: do not filter them out,
          // instead do not create path compoent for them
          // filter out ignored files
          return !/ignore\.html$/.test(fileName)
        })
        .reduce(function (acc, path) {
          return _.extend(acc, createHtmlFile(path))
        }, {})
    } else {
      throw new Error(content + 'is not a file or directory')
    }
  } else if (type === 'string') {
    return {
      main: {
        fileName: 'main',
        fileContent: content
      }
    }
  } else {
    throw new Error('the input.type should be "path" or "string", not "' + type + '"')
  }
}

function createHtmlFile (filePath) {
  // NOTE: fileName does not contain the extention part
  const fileName = path.parse(filePath).name

  return {
    [fileName]: {
      fileName,
      filePath,
      fileContent: fs.readFileSync(filePath, 'utf8')
    }
  }
}
