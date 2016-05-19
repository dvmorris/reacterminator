module.exports = function processFormattedSnippets ({components, options}) {
  if (options.generateFiles) {
    return options.pipThroughPlugins(
      'processFormattedSnippets',
      {components, options}
    ).components
  } else {
    return components
  }
}
