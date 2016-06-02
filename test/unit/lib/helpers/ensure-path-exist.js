/* eslint-env mocha */
const shell = require('shelljs')
const assert = require('chai').assert
const ensurePathExist = require('../../../../lib/helpers/ensure-path-exist')
const path = require('path')

describe('lib/helpers/ensure-path-exist.js', function () {
  beforeEach(function () {
    shell.rm('-rf', './reacterminator')
  })

  it('should not create the path if it already exist', function () {
    const filePath = path.resolve('./reacterminator')

    shell.mkdir(filePath)

    ensurePathExist(filePath)

    assert(shell.test('-d', filePath))
  })
})
