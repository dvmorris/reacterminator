#! /usr/bin/env node

var _ = require('lodash')
var fs = require('fs')
var glob = require('glob')
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
  .option(
    '-p, --output-path [./component]',
    'Specify output path, can be a file or a folder'
  )
  .option('-r, --recursive', 'Find files in the folder recursivly')
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
var rawOptions = _.extend(
  { generateFiles: true },
  _.pick(program, ['outputPath', 'recursive', 'overrideFiles'])
)

var options = _.omitBy(rawOptions, _.isUndefined)

// check if inputPath is a directory or a file
var pathStat = fs.statSync(inputPath)
if (pathStat.isDirectory()) {
  var globPattern = options.recursive ? '/**/*.html' : '/*.html'
  var htmlFiles = glob.sync(inputPath.replace(/\/$/, '') + globPattern)
  htmlFiles.forEach(function (filePath) {
    reacterminator(
      {type: 'file', content: filePath},
      options
    )
  })
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
