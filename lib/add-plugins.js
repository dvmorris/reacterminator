const _ = require('lodash')

const plugins = ['redux', 'super-components'].reduce((acc, pluginName) => {
  acc[pluginName] = require(`./plugins/${pluginName}`)
  return acc
})

module.exports = function addPlugins (options) {
  options.plugins = plugins
  options.pipThroughPlugins = (processName, initialValue) => {
    return _.reduce(plugins, (finalValue, plugin, pluginName) => {
      const processFunction = plugin[processName] || _.identity
      return processFunction(finalValue)
    }, initialValue)
  }

  return options
}
