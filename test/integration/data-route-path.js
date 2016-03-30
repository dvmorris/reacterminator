/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe('data-route-path', function () {
  it('should create routes and app', function () {
    var content = `\
<div data-component-name="Login" data-component-route-path="login">
</div>`

    var LoginExpected = `\
import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div>
      </div>
      );
  }
}\n`

    var RoutesExpected = `\
import React from 'react';
import App from './App';
import Login from './Login';

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Route path='/' component={App}>
          <Route path='login' component={Login} />
        </Route>
      </Router>
      );
  }
}\n`

    var AppExpected = `\
import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children;}
      </div>
      );
  }
}\n`

    var components = reacterminator({type: 'string', content: content})
    var LoginActual = components.Login.formattedFileSnippet
    var RoutesActual = components.Routes.formattedFileSnippet
    var AppActual = components.App.formattedFileSnippet

    assert.deepEqual(LoginActual, LoginExpected)
    assert.deepEqual(RoutesActual, RoutesExpected)
    assert.deepEqual(AppActual, AppExpected)
  })
})
