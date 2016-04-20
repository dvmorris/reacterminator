/* eslint-env mocha */
var assert = require('chai').assert
var addContainers = require('../../../lib/add-containers')

describe('add containers', function () {
  it('empty input', function () {
    assert.deepEqual(addContainers({}), {})
  })

  it('empty options', function () {
    assert.deepEqual(addContainers({}, {changeLinksForParamStore: true}), {})
  })

  it('treat index file differently', function () {
    var components = {
      Index: {
        name: 'Index',
        path: 'index'
      }
    }

    var indexContainerFileSnippet = addContainers(
      components,
      {changeLinksForParamStore: true}
    ).IndexContainer.fileSnippet

    assert.include(indexContainerFileSnippet, 'path !== \'\'')
  })
})
