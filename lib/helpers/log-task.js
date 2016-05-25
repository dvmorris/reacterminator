const chalk = require('chalk')

module.exports = function logTask (task) {
  console.log(chalk.bold(`\n===== ${task}`))
}
