# reacterminator

<p align="center">
  <img src="https://raw.githubusercontent.com/poetic/reacterminator/develop/reacterminator.jpg" width="300px"/>
</p>

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![semantic-release][semantic-release-image]][semantic-release-url]
[![coverall][coverall-image]][coverall-url]
[![js-standard-style][js-standard-style-image]][js-standard-style-url]

[travis-image]:            https://img.shields.io/travis/poetic/reacterminator.svg?branch=master
[travis-url]:              https://travis-ci.org/poetic/reacterminator
[npm-image]:               https://img.shields.io/npm/v/reacterminator.svg
[npm-url]:                 https://npmjs.org/package/reacterminator
[semantic-release-image]:  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:    https://github.com/semantic-release/semantic-release
[coverall-image]:          https://img.shields.io/coveralls/poetic/reacterminator.svg
[coverall-url]:            https://coveralls.io/github/poetic/reacterminator
[js-standard-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[js-standard-style-url]:   http://standardjs.com/

## Node >= 6.1.0

## Usage

### How to use reacterminator?
reacterminator converts htmls into react components in es6 syntax.

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
$ reacterminator -i example.html
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

  FROM:
  ```
  <div data-component-name="ComponentA" data-component-props="isBoolean lastName={'Poetic'}"/>
  ```

  TO:
  ```
  <ComponentA isBoolean lastName={'Poetic'}/>
  ```

- data-component-primary

  FROM:
  ```
  <div data-component-name="Unicorn"/>
  <div data-component-name="Unicorn" data-component-primary="true" class="primary" />
  ```

  TO:
  ```
  <div className="primary" />
  ```

- data-component-wrapper

  FROM:
  ```
  <div data-component-wrapper="ComponentA"/>
  ```

  TO:
  `<ComonentA/>`

- data-component-imports

  FROM:
  ```
  <div data-component-imports="import {Router} from 'react-router'; import _ from 'lodash';"/>
  ```

  TO:
  ```
  import {Router} from 'react-router';
  import _ from 'lodash';
  ```

- data-component-value

  FROM:
  ```
  <div data-component-value="{firstName}">Poetic</div>
  ```

  TO:
  ```
  <div>{firstName}</div>
  ```

- data-component-path

  FROM:
  ```
  <div
    data-component-name="Login"
    data-component-path="login">
  </div>
  ```

  TO:
  ```
  // App.jsx
  import React from 'react';
  import LoginContainer from './LoginContainer';

  export default class App extends React.Component {
    render () {
      return (
        <div>
          <LoginContainer/>
        </div>
      )
    }
  }
  ```

### [REDUX INTEGRATION](redux.README.md)

### CLI
```
npm i -g reacterminator
```

```
Usage: reacterminator [options]

Convert annotated htmls to react component files

Options:

  -h, --help                       output usage information
  -i, --input-path <inputPath>     (REQUIRED) specify input path, it can be a file or a folder
  -p, --output-path [./component]  specify output path
  -r, --recursive                  find files in the input folder recursivly
  -f, --file-to-component          create one component for each file, replace body with div tag
  -R, --redux                      add redux support in the generator

Examples:

  $ reacterminator -i design.html
  $ reacterminator -i design/

Notes:

  If the input is a folder, the files ends with ignore.html will be ignored.
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
 **/

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

### [Source Documents](http://poetic.github.io/reacterminator/doc)

### Workflow
- write spec in read me
- write tests
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

### [Trello](https://trello.com/b/n7iRAJ7M/reacterminator)
