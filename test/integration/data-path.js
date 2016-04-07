/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe('data-path', function () {
  it('should create containers and routes', function () {
    var content = `\
<div data-component-name="Login" data-component-path="login">
</div>`

    var LoginContainerExpected = `\
import React from 'react';
import { connect } from 'param-store';
import Login from './Login';

class LoginContainer extends React.Component {
  render() {
    const style = {
      position: 'absolute'
    };
    if (this.props.currentParams.path !== 'login') {
      return null;
    }

    return (
      <div style={style}>
        <Login {...this.props}/>
      </div>
      );
  }
}

export default connect(LoginContainer, 'path');\n`

    var AppExpected = `\
import React from 'react';
import LoginContainer from './LoginContainer';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <LoginContainer/>
      </div>
      );
  }
}\n`

    var components = reacterminator({type: 'string', content: content})
    var LoginContainerActual = components.LoginContainer.formattedFileSnippet
    var AppActual = components.App.formattedFileSnippet

    assert.deepEqual(LoginContainerActual, LoginContainerExpected)
    assert.deepEqual(AppActual, AppExpected)
  })
})
