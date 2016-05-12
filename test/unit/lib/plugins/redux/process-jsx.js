/* eslint-env mocha */
var assert = require('chai').assert
var parse = require('../../../../../lib/helpers/parse')
var processJsx = require('../../../../../lib/plugins/redux/process-jsx')

describe('lib/plugins/redux/process-jsx', function () {
  it('should extract redux-state', function () {
    var ast = parse('<div data-component-redux-state="stateA,stateB"/>')
    var jsxResult = processJsx({component: {plugins: {redux: {}}}, ast: ast})

    assert.deepEqual(
      jsxResult.component.plugins.redux.state,
      ['stateA', 'stateB']
    )
  })

  it('should extract redux-action', function () {
    var ast = parse('<div data-component-redux-action="actionA,actionB"/>')
    var jsxResult = processJsx({component: {plugins: {redux: {}}}, ast: ast})

    assert.deepEqual(
      jsxResult.component.plugins.redux.action,
      ['actionA', 'actionB']
    )
  })
})
