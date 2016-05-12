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
<body data-component-name="KitchenSink">
  <header
    class="header"
    data-component-name="Header"
    style="font-size: 18">
    <div class="list-item" data-component-name="ListItem">Not Primary</div>
    <div class="list-item"
      data-component-name="ListItem"
      data-component-primary="true">
      Primary
    </div>
    <div
      data-component-props="isBoolean firstName={'Poetic'}"
      data-component-name="CustomRoute"
      data-component-imports="import {Route} from 'react-router'"
      data-component-wrapper="Route">
      I am a route
    </div>
    <img src="logo.jpg">
    <div data-component-value="{firstName}">Poetic</div>
    <script type="text/javascript" src="js/webflow.js"></script>
  </header>
</body>
`

    var expectedHeader = `\
import React from 'react';
import ListItem from './ListItem';
import CustomRoute from './CustomRoute';

class Header extends React.Component {
  render() {
    return (
      <header style={{  fontSize: '18'}} className="header">
        <ListItem></ListItem>
        <ListItem></ListItem>
        <CustomRoute isBoolean firstName={'Poetic'}></CustomRoute> <img src="logo.jpg" />
        <div>
          {firstName}
        </div>
      </header>
      );
  }
}\n;

export default Header;\n`

    var expectedListItem = `\
import React from 'react';

class ListItem extends React.Component {
  render() {
    return (
      <div className="list-item">
        Primary
      </div>
      );
  }
}\n;

export default ListItem;\n`

    var expectedCustomRoute = `\
import React from 'react';
import { Route } from 'react-router';

class CustomRoute extends React.Component {
  render() {
    return (
      <Route>
        I am a route
      </Route>
      );
  }
}\n;

export default CustomRoute;\n`

    var components = reacterminator({type: 'string', content: content})

    assert.deepEqual(components.Header.formattedFileSnippet, expectedHeader)
    assert.deepEqual(components.ListItem.formattedFileSnippet, expectedListItem)
    assert.deepEqual(components.CustomRoute.formattedFileSnippet, expectedCustomRoute)

    assert.deepEqual(components.Header.removedScriptTags, [
      '<script type="text/javascript" src="js/webflow.js"></script>'
    ])
  })
})
