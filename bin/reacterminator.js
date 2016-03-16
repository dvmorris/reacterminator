#! /usr/bin/env node

var _ = require('lodash')
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
      console.log(chalk.bold.red('ERROR: Argument <inputPath> is required'))
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
  {generateFiles: true},
  _.pick(program, ['outputPath', 'recursive', 'overrideFiles'])
)

var options = _.omitBy(rawOptions, _.isUndefined)
reacterminator({type: 'path', content: inputPath}, options)
