/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe('data-value', function () {
  it('should replace inner html with data-component-value', function () {
    var content = `\
<div data-component-name="ComponentA">
  <span data-component-value="{this.props.firstName}">Chun</span>
  <span data-component-value="{this.props.lastName}">Yang</span>
</div>`

    var expectedComponentA = `\
import React from 'react';

class ComponentA extends React.Component {
  render() {
    return (
      <div>
        <span>{this.props.firstName}</span> <span>{this.props.lastName}</span>
      </div>
      );
  }
}\n;

export default ComponentA;\n`

    var realComponentA = reacterminator({type: 'string', content: content})
      .ComponentA
      .formattedFileSnippet

    assert.deepEqual(realComponentA, expectedComponentA)
  })
})
