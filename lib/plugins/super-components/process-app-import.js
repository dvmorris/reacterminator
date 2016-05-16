module.exports = function processAppImport ({component, importSnippet}) {
  const importStack = `import { Stack } from 'react-super-components';\n`
  importSnippet += importStack
  return {component, importSnippet}
}
