# reacterminator
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![coverall][coverall-image]][coverall-url]
[![js-standard-style][js-standard-style-image]][js-standard-style-url]

[travis-image]:            https://img.shields.io/travis/poetic/reacterminator.svg?branch=master
[travis-url]:              https://travis-ci.org/poetic/reacterminator
[npm-image]:               https://img.shields.io/npm/v/reacterminator.svg
[npm-url]:                 https://npmjs.org/package/reacterminator
[coverall-image]:          https://img.shields.io/coveralls/poetic/reacterminator.svg
[coverall-url]:            https://coveralls.io/github/poetic/reacterminator
[js-standard-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[js-standard-style-url]:   http://standardjs.com/

## Usage

### How to use reacterminator?
reacterminator converts htmls into react components.

You need to annoate the html tags with several simple
[data attributes](#data-attributes) that reacterminator recognize.

For example, you can add a `data-component-name` attribute to let
reacterminator know that it is a react component:
```
// file: example.html
<div data-component-name="Unicorn"></div>
```

Then let reacterminator do the chores:
```
$ reacterminator example.html
```

A file named 'Unicorn.jsx' will be generated at './components/Unicorn.jsx'
with the following content:
```
import React from 'react';

export default class Unicorn extends React.Component {
  render() {
    return (
      <div/>
      );
  }
}
```

Please check the [kitchen sink test](test/integration/kitchen-sink.js)
for a comprehensive example of what reacterminator is capable of.

### Data Attributes
- data-component-name
  This attribute tells reacterminator that the html is a react component.
- data-component-props
  This attribute tells reacterminator the props of the react component.
  For example:
  `<div data-component-props="firstName, lastName"/>`
  will let reacterminator add
  `const {firstName, lastName} = this.props`
  into the component file.
- data-component-state
  This attribute tells reacterminator the state of the react component.
  For example:
  `<div data-component-state="firstName, lastName"/>`
  will let reacterminator add
  `const {firstName, lastName} = this.state`
  into the component file.
### CLI
```
npm i -g reacterminator
```

```
Usage: reacterminator [options] <inputPath>

Convert annotated htmls to react component files

Options:

  -h, --help                       output usage information
  -p, --output-path [./component]  specify output path
  -r, --recursive                  find files in the folder recursivly
  -o, --override-files             override existing files in the output path

Examples:

  $ reacterminator design.html
  $ reacterminator design/
```

### NODE
```
/**
 * convert html to react components
 *
 * @param {Object} input
 * {('path'|'string')} input.type
 * {string} input.content
 *          When input.type is 'string', input.content is the html content.
 *          When input.type is 'path', input.content specify the path.
 *          The path can be a directory or a file.
 *
 * @param {Object} options
 * {boolean} [options.generateFiles=false]
 * {string}  [options.outputPath='./components']
 * {boolean} [options.recursive=false]
 *           When it is true, reacterminator will find .html files recursivly
 *           and convert all to them into react components.
 *           When it is false, reacterminator will only find the .html files
 *           in the current directory.
 * {boolean} [options.overrideFiles=false]
 *           When it is true reacterminator will override files it there
 *           is already a file in the output directory.
 */
var reacterminator = require('reacterminator');

var components = reacterminator(
  {
    type: 'string',
    content: '<div data-component-name="Unicorn""></div>'
  },
  {
    generatefiles: false,
  }
);

console.log(components.Unicorn.formattedFileSnippet)

// import React from 'react';
//
// export default class Unicorn extends React.Component {
//   render() {
//     return (
//       <div/>
//       );
//   }
// }
```

## Alternatives
- [htmltojsx](https://github.com/reactjs/react-magic/blob/master/README-htmltojsx.md)
- [html2react](https://github.com/roman01la/html-to-react-components)

## Development

### [Documents](http://poetic.github.io/reacterminator/doc)

### Workflow
- write tests ( use tests as specs )
- implementation ( please practic TDD by `npm run test:watch:mocha` )
- ensure the following before you do a PR ( `npm test` )
  - linting pass
  - tests pass
  - 100% coverage

### Setup
- install correct node version
```shell
nvm install # .nvmrc is used to specify node version
nvm use
```
- make sure you can run this command:
```
npm run test
// Coverall will give you an error since your local is not a travis-ci environment.
// That is OK.
```

### Resouces
- [cheerio](https://github.com/cheeriojs/cheerio)
- [babel](https://github.com/babel/babel)

### Todo
- kitchen sink
- enable user to remove semicolons (in the beautify stage)
- close tags correctly (input without / will generate a <input></input> tag)

### [Trello](https://trello.com/b/n7iRAJ7M/reacterminator)
