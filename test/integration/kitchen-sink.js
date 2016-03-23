/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe('kitchen-sinck', function () {
  it('should show all the functions', function () {
    var content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <header
    class="header"
    data-component-name="Header"
    data-component-props="firstName, lastName"
    data-component-state="isSelected, isAuthorized"
    style="font-size: 18">
    <div class="list-item" data-component-name="ListItem">Not Primary</div>
    <div class="list-item"
      data-component-name="ListItem"
      data-component-primary="true">
      Primary
    </div>
    <div
      data-component-name="CustomRoute"
      data-component-imports="import {Route} from 'react-router'"
      data-component-wrapper="Route">
      I am a route
    </div>
    <div data-component-value="{firstName}">Poetic</div>
    <script type="text/javascript" src="js/webflow.js"></script>
  </header>
</body>
`

    var expectedHeader = `\
import React from 'react';
import ListItem from './ListItem';
import CustomRoute from './CustomRoute';

export default class Header extends React.Component {
  render() {
    const {firstName, lastName} = this.props;
    const {isSelected, isAuthorized} = this.state;

    return (
      <header style={{  fontSize: '18'}} className="header">
        <ListItem></ListItem>
        <ListItem></ListItem>
        <CustomRoute></CustomRoute>
        <div>
          {firstName}
        </div>
      </header>
      );
  }
}\n`

    var expectedListItem = `\
import React from 'react';

export default class ListItem extends React.Component {
  render() {
    return (
      <div className="list-item">
        Primary
      </div>
      );
  }
}\n`

    var expectedCustomRoute = `\
import React from 'react';
import { Route } from 'react-router';

export default class CustomRoute extends React.Component {
  render() {
    return (
      <Route>
        I am a route
      </Route>
      );
  }
}\n`

    var components = reacterminator({type: 'string', content: content})

    assert.deepEqual(components.Header.formattedFileSnippet, expectedHeader)
    assert.deepEqual(components.ListItem.formattedFileSnippet, expectedListItem)
    assert.deepEqual(components.CustomRoute.formattedFileSnippet, expectedCustomRoute)

    assert.deepEqual(components.Header.removedScriptTags, [
      '<script type="text/javascript" src="js/webflow.js"/>'
    ])
  })
})
