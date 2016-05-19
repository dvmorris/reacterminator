# Architecture

## TODO
- allow for processAll

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
        fileName: [fileName],
        filePath: [filePath],
        fileContent: [fileContent]
      }
    },
    options: { }
  }
  ```

- htmlSnippets
  ```javascript
  {
    components: {
      [componentName]: {
        fromPath: [fromPath],
        isPath: [isPath],
        componentName: [componentName],
        htmlSnippet: [htmlSnippet]
      }
    },
    options: { }
  }
  ```

- jsxSnippets
  ```javascript
  {
    components: {
      [componentName]: {
        fromPath: [fromPath],
        isPath: [isPath],
        componentName: [componentName],
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
    components: {
      [componentName]: {
        fromPath: [fromPath],
        isPath: [isPath],
        componentName: [componentName],
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
    components: {
      [componentName]: {
        fromPath: [fromPath],
        isPath: [isPath],
        componentName: [componentName],
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
    components: {
      [componentName]: {
        fromPath: [fromPath],
        isPath: [isPath],
        componentName: [componentName],
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
    components: {
      [componentName]: {
        fromPath: [fromPath],
        isPath: [isPath],
        componentName: [componentName],
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

- fileSnippets
  ```javascript
  {
    components: {
      [componentName]: {
        fromPath: [fromPath],
        isPath: [isPath],
        componentName: [componentName],
        htmlSnippet: [htmlSnippet],
        jsxSnippet: [jsxSnippet],
        declarationSnippet: [declarationSnippet],
        withImportSnippet: [withImportSnippet],
        withExportSnippet: [withExportSnippet],
        formatedsnippet: [formatedsnippet],
        fileSnippet: [fileSnippet],
        relativeFilePath: [relativeFilePath]
      }
    },
    options: { }
  }
  ```
