/* eslint-env mocha */
var assert = require('chai').assert
var addImport = require('../../../../../lib/plugins/redux/add-import')

describe('lib/plugins/redux/add-import', function () {
  it('should import reduxConnect if there is state', function () {
    var importResult = addImport({
      component: {plugins: {redux: {state: ['stateA']}}},
      importSnippet: ''
    })

    assert.deepEqual(
      importResult.importSnippet,
      `import { connect as reduxConnect } from 'redux';\n`
    )
  })

  it('should import reduxConnect if there is action', function () {
    var importResult = addImport({
      component: {plugins: {redux: {action: ['actionA']}}},
      importSnippet: ''
    })

    assert.deepEqual(
      importResult.importSnippet,
      `import { connect as reduxConnect } from 'redux';\n`
    )
  })

  it('should not import reduxConnect if there is no state or action', function () {
    var importResult = addImport({
      component: {plugins: {redux: {}}},
      importSnippet: ''
    })

    assert.deepEqual(
      importResult.importSnippet,
      ''
    )
  })
})
