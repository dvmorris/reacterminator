/* eslint-env mocha */
const assert = require('chai').assert
const reacterminator = require('../../lib/index')

describe('data-path', function () {
  it('should create containers and routes', function () {
    const content = `\
<div data-component-name="Login" data-component-path="login">
</div>`

    const AppExpected = `\
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div />
      );
  }
}
;

export default App;
`

    const components = reacterminator(
      {type: 'string', content: content}
    )
    const AppActual = components.App.formattedFileSnippet

    assert.deepEqual(AppActual, AppExpected)
  })
})
