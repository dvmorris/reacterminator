module.exports = function processAppImport ({component, importSnippet}) {
  const importStack = `import { Stack } from 'super-components';\n`
  importSnippet += importStack
  return {component, importSnippet}
}
