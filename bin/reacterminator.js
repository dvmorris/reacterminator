#! /usr/bin/env node

var _ = require('lodash')
var fs = require('fs')
var chalk = require('chalk')
var program = require('commander')
var reacterminator = require('../lib/index')
var inputPath

program
  .description('Convert annotated htmls to react component files')
  .arguments('<inputPath>')
  .action(function (inputPathArgument) {
    inputPath = _.trim(inputPathArgument)
    if (inputPath) {
      inputPath = process.cwd() + '/' + inputPath
    } else {
      logError('Argument <inputPath> is required')
      process.exit(1)
    }
  })
  .option('-p, --output-path [./component]', 'Specify output path')
  .option('-o, --override-files', 'Override existing files in the output path')

program.on('--help', function () {
  console.log('  Examples:')
  console.log('')
  console.log('    $ reacterminator design.html')
  console.log('    $ reacterminator design/')
  console.log('')
})

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
  process.exit(1)
}

// prepare options
var options = {
  generateFiles: true,
  overrideFiles: program.overrideFiles
}
if (program.outputPath) {
  options.outputPath = program.outputPath
}

// check if inputPath is a directory or a file
var pathStat = fs.statSync(inputPath)
if (pathStat.isDirectory()) {
  // TODO: move this feature to index.js, cli should only be an interface
  // TODO: get all html files in this folder,
  // we should be able to get it recursivly
  // var htmlFiles = []
} else if (pathStat.isFile()) {
  reacterminator(
    {type: 'file', content: inputPath},
    options
  )
}

// helpers
function logError (message) {
  console.log(chalk.bold.red('ERROR: ' + message))
}
