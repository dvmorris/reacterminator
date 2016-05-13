const htmlToReact = require('./html-to-react')

function addAppComponent (mergedFileSnippets, options) {
  Object.assign(
    mergedFileSnippets,
    htmlToReact('<div data-component-name="App"></div>', options)
  )
}

module.exports = addAppComponent
