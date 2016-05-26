const _ = require('lodash')

// TODO: give the user a way to specify order, super-components before redux
const plugins = ['main', 'super-components', 'redux'].reduce((acc, pluginName) => {
  acc[pluginName] = require(`./plugins/${pluginName}`)
  return acc
}, {})

function pipThroughPlugins (processName, initialValue) {
  return _.reduce(plugins, (finalValue, plugin, pluginName) => {
    const processFunction = plugin[processName] || _.identity
    return processFunction(finalValue)
  }, initialValue)
}

module.exports = function createPluginsAndPipline () {
  return {plugins, pipThroughPlugins}
}
