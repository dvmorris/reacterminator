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

## Development

### Workflow
- add specs
- write tests
- implementation ( `npm tdd` )
- ensure the following before you do a PR ( `npm test-local` )
  - linting pass
  - tests pass
  - 100% coverage

### Setup
- install correct node version
```shell
nvm install # .nvmrc is used to specify node version
```
- make sure you can run this command with out any error
```
npm run test-local
```

### Linting
[standard js](https://github.com/feross/standard)

### [Documents](http://poetic.github.io/reacterminator/doc)
[jsdoc](https://github.com/jsdoc3/jsdoc)

### Resouces
- [cheerio](https://github.com/cheeriojs/cheerio)
- [htmltojsx](https://github.com/reactjs/react-magic/blob/master/README-htmltojsx.md)

### TODO
- how to add specs into repo
