/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe('data-primary', function () {
  it('should use the primary component', function () {
    var content = `\
<div data-component-name="ComponentA">Not Primary</div>
<div data-component-name="ComponentA" data-component-primary="true">Primary</div>`

    var expectedComponentA = `\
import React from 'react';

export default class ComponentA extends React.Component {
  render() {
    return (
      <div>
        Primary
      </div>
      );
  }
}\n`

    var ComponentA = reacterminator({type: 'string', content: content})
      .ComponentA
      .formattedFileSnippet

    assert.deepEqual(ComponentA, expectedComponentA)
  })
})
