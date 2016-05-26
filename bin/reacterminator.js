#! /usr/bin/env node

var _ = require('lodash')
var program = require('commander')
var reacterminator = require('../lib/index')

program
  .description('Convert annotated htmls to react component files')
  .option('-i, --input-path <inputPath>', '(REQUIRED) specify input path, it can be a file or a folder')
  .option('-p, --output-path [./component]', 'specify output path')
  .option('-r, --recursive', 'find files in the input folder recursivly')
  .option('-f, --file-to-component', 'create one component for each file, replace body with div tag')

program.on('--help', function () {
  console.log('  Examples:')
  console.log('')
  console.log('    $ reacterminator -i design.html')
  console.log('    $ reacterminator -i design/')
  console.log('')
  console.log('  Notes:')
  console.log('')
  console.log('    If the input is a folder, the files ends with -ignore.html will be ignored.')
  console.log('')
})

if (!process.argv.slice(2).length) {
  program.outputHelp()
  process.exit(1)
}

program.parse(process.argv)

if (!program.inputPath) {
  throw new Error('<inputPath> is required, use -i to specify it')
}

// prepare options
var options = _.extend(
  {generateFiles: true},
  _.pick(program, ['outputPath', 'recursive', 'fileToComponent'])
)

var cleanedOptions = _.omitBy(options, _.isUndefined)

reacterminator(
  {type: 'path', content: program.inputPath},
  cleanedOptions
)
