module.exports = function processAppImport ({component, importSnippet}) {
  const importProvider = `import { Provider } from 'react-redux';\n`
  const importStore = `import store from '../store';\n`
  importSnippet += importProvider + importStore
  return {component, importSnippet}
}
