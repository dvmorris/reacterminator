/* eslint-env mocha */
var assert = require('chai').assert
var createReducerContentByType = require('../../../../../../lib/plugins/redux/process-all-formatted-snippets/create-reducer-content-by-type')

describe('lib/plugins/redux/process-all-formatted-snippets/create-reducer-content-by-type', function () {
  it('should throw an error when the type is not recognized', function () {
    assert.throws(
      function () {
        createReducerContentByType({type: 'non-exist'})
      },
      /not recognized/
    )
  })
})

