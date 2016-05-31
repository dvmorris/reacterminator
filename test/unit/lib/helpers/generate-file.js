/* eslint-env mocha */
const fs = require('fs')
const shell = require('shelljs')
const assert = require('chai').assert
const generateFile = require('../../../../lib/helpers/generate-file')
const path = require('path')

describe('lib/helpers/generate-file.js', function () {
  beforeEach(function () {
    shell.rm('-rf', './reacterminator')
    shell.mkdir('./reacterminator')
  })

  it('should override if the file is not custom', function () {
    const filePath = path.resolve('./reacterminator/custom.js')

    generateFile({filePath, content: 'origin'})
    generateFile({filePath, content: 'override'})

    assert.equal(fs.readFileSync(filePath, 'utf-8'), '/* eslint-disable */\noverride')
  })
})
