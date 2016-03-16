module.exports = generateFiles

var _ = require('lodash')
var fs = require('fs')

function generateFiles (components, options) {
  // make sure outputPath folder exist
  var outputPath = options.outputPath
  var outputPathExists
  try {
    outputPathExists = fs.statSync(outputPath).isDirectory()
  } catch (e) {
    outputPathExists = false
  }

  if (!outputPathExists) {
    fs.mkdirSync(outputPath)
  }

  _.each(components, function (component) {
    var filePath = outputPath + '/' + component.name + '.jsx'
    // check if the the file aready exists
    var fileExists
    try {
      fileExists = fs.statSync(outputPath).isFile()
    } catch (e) {
      fileExists = false
    }

    // TODO: log the info
    if (fileExists && !options.overrideFiles) {
      return
    }

    fs.writeFileSync(filePath, component.fileSnippet)
  })
}
