const _ = require('lodash')

// TODO: give the user a way to specify order, super-components before redux
const plugins = ['super-components', 'redux'].reduce((acc, pluginName) => {
  acc[pluginName] = require(`./plugins/${pluginName}`)
  return acc
}, {})

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
