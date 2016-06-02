/* eslint-env mocha */
const fs = require('fs')
const shell = require('shelljs')
const assert = require('chai').assert
const cleanFolder = require('../../../../lib/helpers/clean-folder')
const path = require('path')

describe('lib/helpers/clean-folder.js', function () {
  beforeEach(function () {
    shell.rm('-rf', './reacterminator')
  })

  it('should not create the path if it already exist', function () {
    const folderPath = path.resolve('./reacterminator')

    shell.mkdir(folderPath)
    const notCustomPath = path.resolve(folderPath, 'not-custom.js')
    fs.writeFileSync(notCustomPath, '/* eslint-disable */\nnot custom')
    const customPath = path.resolve(folderPath, 'custom.js')
    fs.writeFileSync(customPath, '//')

    cleanFolder(folderPath)

    assert(!shell.test('-f', notCustomPath), 'generated file should not exist')
    assert(shell.test('-f', customPath), 'custom file should exist')
  })
})
