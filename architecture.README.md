# Architecture

## Summary

There are two main ideas in the architecture:
- pipline
- plugins

The main program is only a pipline that apply plugins AFTER each stage.

The main plugin runs before any plugins.
Plugins should be as independent as possible.
Plugins modify the data piped through and can attach pulgin specific
data or manipulate data as however the plugin want.

The pipline will find a function called [stageName]Process in the plugin object
to apply to the data.

## Stages

- htmlFiles
  ```javascript
  {
    htmlFiles: {
      [filePath]: {
        path: [path],
        name: [name],
        htmlFile: [htmlFile]
      }
    },
    options: { }
  }
  ```

- htmlSnippets
  ```javascript
  {
    htmlSnippets: {
      [componentName]: {
        fromPath: [fromPath],
        isPath: [isPath],
        name: [name],
        htmlSnippet: [htmlSnippet]
      }
    },
    options: { }
  }
  ```

- jsxSnippets
  ```javascript
  {
    jsxSnippets: {
      [componentName]: {
        fromPath: [fromPath],
        isPath: [isPath],
        name: [name],
        htmlSnippet: [htmlSnippet],
        jsxSnippet: [jsxSnippet]
      }
    },
    options: { }
  }
  ```

- declarationSnippets
  ```javascript
  {
    declarationSnippets: {
      [componentName]: {
        fromPath: [fromPath],
        isPath: [isPath],
        name: [name],
        htmlSnippet: [htmlSnippet],
        jsxSnippet: [jsxSnippet],
        declarationSnippet: [declarationSnippet]
      }
    },
    options: { }
  }
  ```

- withImportSnippets
  ```javascript
  {
    withImportSnippets: {
      [componentName]: {
        fromPath: [fromPath],
        isPath: [isPath],
        name: [name],
        htmlSnippet: [htmlSnippet],
        jsxSnippet: [jsxSnippet],
        declarationSnippet: [declarationSnippet],
        withImportSnippet: [withImportSnippet]
      }
    },
    options: { }
  }
  ```

- withExportSnippets
  ```javascript
  {
    withExportSnippets: {
      [componentName]: {
        fromPath: [fromPath],
        isPath: [isPath],
        name: [name],
        htmlSnippet: [htmlSnippet],
        jsxSnippet: [jsxSnippet],
        declarationSnippet: [declarationSnippet],
        withImportSnippet: [withImportSnippet],
        withExportSnippet: [withExportSnippet]
      }
    },
    options: { }
  }
  ```

- formattedSnippets
  ```javascript
  {
    formattedSnippets: {
      [componentName]: {
        fromPath: [fromPath],
        isPath: [isPath],
        name: [name],
        htmlSnippet: [htmlSnippet],
        jsxSnippet: [jsxSnippet],
        declarationSnippet: [declarationSnippet],
        withImportSnippet: [withImportSnippet],
        withExportSnippet: [withExportSnippet],
        formatedsnippet: [formatedsnippet]
      }
    },
    options: { }
  }
  ```
