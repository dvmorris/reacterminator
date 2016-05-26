/* eslint-env mocha */
var assert = require('chai').assert
var createReducerContent = require('../../../../../../lib/plugins/redux/process-all-formatted-snippets/create-action-creator-content')

describe('lib/plugins/redux/process-all-formatted-snippets/create-action-creator-content', function () {
  it('should throw an error when the type is not recognized', function () {
    assert.throws(
      function () {
        createReducerContent({type: 'non-exist'})
      },
      /not recognized/
    )
  })
})
