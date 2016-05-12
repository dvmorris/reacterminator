/* eslint-env mocha */
var assert = require('chai').assert
var addExport = require('../../../../../lib/plugins/redux/add-export')

describe('lib/plugins/redux/add-export', function () {
  it('should wrap component if there is state', function () {
    var exportResult = addExport({
      component: {plugins: {redux: {state: ['stateA']}}},
      exportSnippet: '',
      exportName: 'ComponentA'
    })

    assert.deepEqual(
      exportResult.exportSnippet,
`const ComponentAWithRedux = connect(
  (state) => (
    {
      'state.stateA': state.stateA
    }
  ),
  {}
)(ComponentA);\n`
    )
    assert.deepEqual(
      exportResult.exportName,
      'ComponentAWithRedux'
    )
  })

  it('should wrap component if there is action', function () {
    var exportResult = addExport({
      component: {plugins: {redux: {action: ['actionA']}}},
      exportSnippet: '',
      exportName: 'ComponentA'
    })

    assert.deepEqual(
      exportResult.exportSnippet,

`const ComponentAWithRedux = connect(
  null,
  {
    'action.actionA': action.actionA
  }
)(ComponentA);\n`
    )
    assert.deepEqual(
      exportResult.exportName,
      'ComponentAWithRedux'
    )
  })

  it('should import reduxConnect if there is action and state', function () {
    var exportResult = addExport({
      component: {plugins: {redux: {action: ['actionA'], state: ['stateA']}}},
      exportSnippet: '',
      exportName: 'ComponentA'
    })

    assert.deepEqual(
      exportResult.exportSnippet,
`const ComponentAWithRedux = connect(
  (state) => (
    {
      'state.stateA': state.stateA
    }
  ),
  {
    'action.actionA': action.actionA
  }
)(ComponentA);\n`
    )
    assert.deepEqual(
      exportResult.exportName,
      'ComponentAWithRedux'
    )
  })

  it('should not wrap component if there is no state or action', function () {
    var exportResult = addExport({
      component: {plugins: {redux: {}}},
      exportSnippet: '',
      exportName: 'ComponentA'
    })

    assert.deepEqual(
      exportResult.exportSnippet,
      ''
    )
    assert.deepEqual(
      exportResult.exportName,
      'ComponentA'
    )
  })
})
