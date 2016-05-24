/* eslint-env mocha */
const assert = require('chai').assert
const parse = require('../../../../../lib/helpers/parse')
const processJsx = require('../../../../../lib/plugins/redux/process-jsx')
const generate = require('babel-generator').default

// TODO: use path name instead of component name to name space
const component = {
  componentName: 'User',
  plugins: {
    redux: {}
  }
}

describe('lib/plugins/redux/process-jsx', function () {
  it('should add value and onChange to input', function () {
    const ast = parse('<input id="name" />')
    const jsxResult = processJsx({component, ast})

    assert.deepEqual(
      jsxResult.component.plugins.redux.state,
      ['state.user.name']
    )

    assert.deepEqual(
      jsxResult.component.plugins.redux.action,
      ['action.user.changeName']
    )

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<input id="name" value={this.props[\'state.user.name\']} onChange={this.props[\'action.user.changeName\']} />;'
    )
  })

  it('should add onClick to button', function () {
    const ast = parse('<button id="delete" />')
    const jsxResult = processJsx({component, ast})

    assert.deepEqual(
      jsxResult.component.plugins.redux.action,
      ['action.user.clickDelete']
    )

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<button id="delete" onClick={this.props[\'action.user.clickDelete\']} />;'
    )
  })

  it('should add onSubmit to form', function () {
    const ast = parse('<form id="add-user" />')
    const jsxResult = processJsx({component, ast})

    assert.deepEqual(
      jsxResult.component.plugins.redux.action,
      ['action.user.submitAddUser']
    )

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<form id="add-user" onSubmit={this.props[\'action.user.submitAddUser\']} />;'
    )
  })
})
