/* eslint-env mocha */
var assert = require('chai').assert
var htmlTagsToComponentTags = require('../../../lib/html-tags-to-component-tags')

describe('html-tags-to-component-tags', function () {
  it('should convert annotated tags to component', function () {
    var component = {
      name: 'ComponentA',
      htmlSnippet: '<div> <div data-component-name=\"ComponentB\"> </div> </div>'
    }

    assert.deepEqual(
      htmlTagsToComponentTags(component),
      {
        name: 'ComponentA',
        htmlSnippet: '<div> <ComponentB></ComponentB> </div>',
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
      htmlTagsToComponentTags(component),
      {
        name: 'ComponentA',
        htmlSnippet: '<div> <ComponentB></ComponentB> </div>',
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
      htmlTagsToComponentTags(component),
      {
        name: 'ComponentA',
        htmlSnippet: '<div> <ComponentB></ComponentB> <div> not a component </div> </div>',
        dependencies: ['ComponentB']
      }
    )
  })
})
