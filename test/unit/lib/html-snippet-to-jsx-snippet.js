/* eslint-env mocha */
var assert = require('chai').assert
var htmlSnippetToJsxSnippet = require('../../../lib/html-snippet-to-jsx-snippet')

describe('html-snippet-to-jsx-snippet', function () {
  it('should convert annotated tags to component', function () {
    var component = {
      componentName: 'ComponentA',
      htmlSnippet: '<div> <div data-component-name="ComponentB"> </div> </div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet({component}),
      {
        componentName: 'ComponentA',
        htmlSnippet: '<div> <div data-component-name="ComponentB"> </div> </div>',
        jsxSnippet: '<div> <ComponentB></ComponentB> </div>',
        dependencies: ['ComponentB']
      }
    )
  })

  it('should only add the outermost components to dependencies', function () {
    var component = {
      componentName: 'ComponentA',
      htmlSnippet: '<div> <div data-component-name="ComponentB"> <div data-component-name="ComponentC"> </div> </div> </div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet({component}),
      {
        componentName: 'ComponentA',
        htmlSnippet: '<div> <div data-component-name="ComponentB"> <div data-component-name="ComponentC"> </div> </div> </div>',
        jsxSnippet: '<div> <ComponentB></ComponentB> </div>',
        dependencies: ['ComponentB']
      }
    )
  })

  it('should leave non-componets tag unchanged', function () {
    var component = {
      componentName: 'ComponentA',
      htmlSnippet: '<div> <div data-component-name="ComponentB"> <div data-component-name="ComponentC"> </div> </div> <div> not a component </div> </div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet({component}),
      {
        componentName: 'ComponentA',
        htmlSnippet: '<div> <div data-component-name="ComponentB"> <div data-component-name="ComponentC"> </div> </div> <div> not a component </div> </div>',
        jsxSnippet: '<div> <ComponentB></ComponentB> <div> not a component </div> </div>',
        dependencies: ['ComponentB']
      }
    )
  })

  it('should change class to className, for to htmlFor', function () {
    var component = {
      componentName: 'ComponentA',
      htmlSnippet: '<div class="class-a" for="input-a"></div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet({component}).jsxSnippet,
      '<div className="class-a" htmlFor="input-a" />'
    )
  })

  it('should change class to className, for to htmlFor for inner html', function () {
    var component = {
      componentName: 'ComponentA',
      htmlSnippet: '<div class="class-a" for="input-a"><div class="class-b"></div></div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet({component}).jsxSnippet,
      '<div className="class-a" htmlFor="input-a"><div className="class-b" /></div>'
    )
  })

  it('should use object for style', function () {
    var component = {
      componentName: 'ComponentA',
      htmlSnippet: '<div style="padding-right: 100px; -webket-flex-box: flex;"></div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet({component}).jsxSnippet,
      '<div style={{ paddingRight: \'100px\', WebketFlexBox: \'flex\' }} />'
    )
  })

  it('should work if style is empty', function () {
    var component = {
      componentName: 'ComponentA',
      htmlSnippet: '<div style=""></div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet({component}).jsxSnippet,
      '<div style={{}} />'
    )
  })

  it('should change both class and style', function () {
    var component = {
      componentName: 'ComponentA',
      htmlSnippet: '<div class="class-a" style="font-size: 10px"></div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet({component}).jsxSnippet,
      '<div style={{ fontSize: \'10px\' }} className="class-a" />'
    )
  })

  it('should delete attributes for all inner components', function () {
    var component = {
      componentName: 'ComponentA',
      htmlSnippet: `\
<div id="component-a">
  <div data-component-name="ComponentB" id="component-b">
  </div>
</div>`
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet({component}).jsxSnippet,
      '<div id="component-a"> <ComponentB></ComponentB> </div>'
    )
  })

  it('should not delete attributes for non component tags', function () {
    var component = {
      componentName: 'ComponentA',
      htmlSnippet: `\
<div id="component-a">
  <div id="component-b">
  </div>
</div>`
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet({component}).jsxSnippet,
      '<div id="component-a"> <div id="component-b"> </div> </div>'
    )
  })
})
