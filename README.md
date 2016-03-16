# reacterminator
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![coverall][coverall-image]][coverall-url]

[travis-image]:   https://img.shields.io/travis/poetic/reacterminator.svg?branch=master
[travis-url]:     https://travis-ci.org/poetic/reacterminator
[npm-image]:      https://img.shields.io/npm/v/reacterminator.svg
[npm-url]:        https://npmjs.org/package/reacterminator
[coverall-image]: https://img.shields.io/coveralls/poetic/reacterminator.svg
[coverall-url]:   https://coveralls.io/github/poetic/reacterminator

## CLI
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

## [Documents](http://poetic.github.io/reacterminator/doc)

## Development

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

### Linting
[standard js](https://github.com/feross/standard)

### Resouces
- [cheerio](https://github.com/cheeriojs/cheerio)
- [babel](https://github.com/babel/babel)
