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
    <ul class="list" data-component-name="Nav">
      <li class="list-item" data-component-name="ListItem"></li>
      <li class="list-item" data-component-name="ListItem"></li>
    </ul>
  </header>

  <script type="text/javascript" src="js/webflow.js"></script>
</body>
`

    var Header = `\
import React from 'react';
import Nav from './Nav';

export default class Header extends React.Component {
  render() {
    const {firstName, lastName} = this.props;
    const {isSelected, isAuthorized} = this.state;

    return (
      <header style={{  fontSize: '18'}} className="header">
        <Nav className="list" />
      </header>
      );
  }
}\n`

    var components = reacterminator({type: 'string', content: content})

    assert.deepEqual(components.Header.formattedFileSnippet, Header)
  })
})
