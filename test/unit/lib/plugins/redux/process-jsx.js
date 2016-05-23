/* eslint-env mocha */
const assert = require('chai').assert
const parse = require('../../../../../lib/helpers/parse')
const processJsx = require('../../../../../lib/plugins/redux/process-jsx')

// TODO: use path name instead of component name to name space
const component = {
  componentName: 'User',
  plugins: {
    redux: {}
  }
}

describe.only('lib/plugins/redux/process-jsx', function () {
  it('should add value and onChange to input', function () {
    const ast = parse('<input id="name" />')
    const jsxResult = processJsx({component, ast})

    assert.deepEqual(
      jsxResult.component.plugins.redux.state,
      ['user.name']
    )

    assert.deepEqual(
      jsxResult.component.plugins.redux.action,
      ['user.changeName']
    )

    // TODO: check jsxResult snippet
  })

  it('should add onClick to button', function () {
    const ast = parse('<button id="delete" />')
    const jsxResult = processJsx({component, ast})

    assert.deepEqual(
      jsxResult.component.plugins.redux.action,
      ['user.clickDelete']
    )
  })

  it('should add onSubmit to form', function () {
    const ast = parse('<form id="add-user" />')
    const jsxResult = processJsx({component, ast})

    assert.deepEqual(
      jsxResult.component.plugins.redux.action,
      ['user.submitAddUser']
    )
  })
})
