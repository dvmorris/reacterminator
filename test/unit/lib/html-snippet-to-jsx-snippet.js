/* eslint-env mocha */
var assert = require('chai').assert
var htmlSnippetToJsxSnippet = require('../../../lib/html-snippet-to-jsx-snippet')

describe('html-snippet-to-jsx-snippet', function () {
  it('should convert annotated tags to component', function () {
    var component = {
      name: 'ComponentA',
      htmlSnippet: '<div> <div data-component-name=\"ComponentB\"> </div> </div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet(component),
      {
        name: 'ComponentA',
        htmlSnippet: '<div> <div data-component-name=\"ComponentB\"> </div> </div>',
        jsxSnippet: '<div> <ComponentB></ComponentB> </div>;',
        dependencies: ['ComponentB']
      }
    )
  })

  it('should only add the outermost components to dependencies', function () {
    var component = {
      name: 'ComponentA',
      htmlSnippet: '<div> <div data-component-name=\"ComponentB\"> <div data-component-name=\"ComponentC\"> </div> </div> </div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet(component),
      {
        name: 'ComponentA',
        htmlSnippet: '<div> <div data-component-name=\"ComponentB\"> <div data-component-name=\"ComponentC\"> </div> </div> </div>',
        jsxSnippet: '<div> <ComponentB></ComponentB> </div>;',
        dependencies: ['ComponentB']
      }
    )
  })

  it('should leave non-componets tag unchanged', function () {
    var component = {
      name: 'ComponentA',
      htmlSnippet: '<div> <div data-component-name=\"ComponentB\"> <div data-component-name=\"ComponentC\"> </div> </div> <div> not a component </div> </div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet(component),
      {
        name: 'ComponentA',
        htmlSnippet: '<div> <div data-component-name=\"ComponentB\"> <div data-component-name=\"ComponentC\"> </div> </div> <div> not a component </div> </div>',
        jsxSnippet: '<div> <ComponentB></ComponentB> <div> not a component </div> </div>;',
        dependencies: ['ComponentB']
      }
    )
  })

  it('should change class to className, for to htmlFor', function () {
    var component = {
      name: 'ComponentA',
      htmlSnippet: '<div class="class-a" for="input-a"></div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet(component).jsxSnippet,
      '<div className="class-a" htmlFor="input-a"></div>;'
    )
  })

  it('should change class to className, for to htmlFor for inner html', function () {
    var component = {
      name: 'ComponentA',
      htmlSnippet: '<div class="class-a" for="input-a"><div class="class-b"></div></div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet(component).jsxSnippet,
      '<div className="class-a" htmlFor="input-a"><div className="class-b"></div></div>;'
    )
  })
})
