module.exports = parse

var chalk = require('chalk')
var babylon = require('babylon')

function parse (string) {
  try {
    return babylon.parse(string, {plugins: ['jsx']})
  } catch (e) {
    console.log(chalk.bold.red('problematic string: '), string)
    throw e
  }
}
