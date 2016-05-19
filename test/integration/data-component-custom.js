/* eslint-env mocha */
const assert = require('chai').assert
const reacterminator = require('../../lib/index')
const fs = require('fs')
const shell = require('shelljs')

describe('data-component-custom', function () {
  beforeEach(function () {
    shell.exec('rm -rf ./reacterminator')
  })

  it('should create a custom component', function () {
    reacterminator(
      {
        type: 'path',
        content: './examples/test/test-data-component-custom.html'
      },
      {
        generateFiles: true,
        fileToComponent: true
      }
    )

    const TestDataComponentCustomExpected = `\
import React from 'react';
import Custom from '../custom-components/Custom';

class TestDataComponentCustom extends React.Component {
  render() {
    return (
      <div>
        <Custom></Custom>
      </div>
      );
  }
}
;

export default TestDataComponentCustom;
`

    assert.deepEqual(
      fs.readFileSync('./reacterminator/readonly-components/TestDataComponentCustom.jsx', 'utf-8'),
      TestDataComponentCustomExpected
    )

    const CustomExpected = `\
import React from 'react';

class Custom extends React.Component {
  render() {
    return (
      <div>
        custom
      </div>
      );
  }
}
;

export default Custom;
`
    assert.deepEqual(
      fs.readFileSync('./reacterminator/custom-components/Custom.jsx', 'utf-8'),
      CustomExpected
    )
  })
})
