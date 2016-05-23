/* eslint-env mocha */
const assert = require('chai').assert
const processImport = require('../../../../../lib/plugins/redux/process-import')

describe('lib/plugins/redux/add-import', function () {
  it('should import reduxConnect if there is state', function () {
    const importResult = processImport({
      component: {plugins: {redux: {state: ['stateA']}}},
      importSnippet: ''
    })

    assert.deepEqual(
      importResult.importSnippet,
      `import { connect as reduxConnect } from 'react-redux';\n`
    )
  })

  it('should import reduxConnect if there is action', function () {
    const importResult = processImport({
      component: {plugins: {redux: {action: ['actionA']}}},
      importSnippet: ''
    })

    assert.deepEqual(
      importResult.importSnippet,
`\
import { connect as reduxConnect } from 'react-redux';
import action from '../action-creators/readonly-index';
`
    )
  })

  it('should not import reduxConnect if there is no state or action', function () {
    const importResult = processImport({
      component: {plugins: {redux: {}}},
      importSnippet: ''
    })

    assert.deepEqual(
      importResult.importSnippet,
      ''
    )
  })
})
