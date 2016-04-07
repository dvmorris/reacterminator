/* eslint-env mocha */
var assert = require('chai').assert
var parse = require('../../../../lib/helpers/parse')
var generate = require('babel-generator').default
var changeLinksForParamStore = require('../../../../lib/html-snippet-to-jsx-snippet/change-links-for-param-store')

describe('change links for param store', function () {
  it('should change anchor tag', function () {
    var ast = parse('<a href="directory.html"/>')
    changeLinksForParamStore({ast: ast}, {changeLinksForParamStore: true})

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<a href="directory.html" onClick={() => {\n' +
      '  ParamStore.set({ path: \'directory\' });\n' +
      '}} />;'
    )
  })

  it('should not change anchor tag starts with #', function () {
    var ast = parse('<a href="#to-the-moon"/>')
    changeLinksForParamStore({ast: ast}, {changeLinksForParamStore: true})

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<a href="#to-the-moon" />;'
    )
  })

  it('do nothing if not an anchor tag', function () {
    var ast = parse('<div href="directory.html"/>')
    changeLinksForParamStore({ast: ast}, {changeLinksForParamStore: true})

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<div href="directory.html" />;'
    )
  })

  it('do nothing if does not have a href tag', function () {
    var ast = parse('<a />')
    changeLinksForParamStore({ast: ast}, {changeLinksForParamStore: true})

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<a />;'
    )
  })

  it('should not change anchor tag when changeLinksForParamStore is false', function () {
    var ast = parse('<a href="directory.html"/>')
    changeLinksForParamStore({ast: ast}, {})

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<a href="directory.html" />;'
    )
  })

  it('should not change anchor tag with absolute url', function () {
    var ast = parse('<a href="http://www.google.com"/>')
    changeLinksForParamStore({ast: ast}, {changeLinksForParamStore: true})

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<a href="http://www.google.com" />;'
    )
  })

  it('should not override existing onClick event', function () {
    var ast = parse('<a href="http://www.google.com" onClick={() => null}/>')
    changeLinksForParamStore({ast: ast}, {changeLinksForParamStore: true})

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<a href="http://www.google.com" onClick={() => null} />;'
    )
  })

  it('should add import ParamStore if it is not used', function () {
    var ast = parse('<a href="#"/>')
    var component = {ast: ast}
    changeLinksForParamStore(component, {changeLinksForParamStore: true})

    assert.deepEqual(component.imports, undefined)
  })

  it('should add import ParamStore if it is used', function () {
    var ast = parse('<a href="user"/>')
    var component = {ast: ast}
    changeLinksForParamStore(component, {changeLinksForParamStore: true})

    assert.deepEqual(
      component.imports,
      'import ParamStore from \'param-store\';'
    )
  })
})
