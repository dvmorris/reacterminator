/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')
var _ = require('lodash')

describe('data-primary', function () {
  it('should use the primary component', function () {
    var content = `\
<div data-component-name="ComponentA">Not Primary</div>
<div data-component-name="ComponentA" data-component-primary="true">Primary</div>`

    var ComponentAExpected = `\
import React from 'react';

export default class ComponentA extends React.Component {
  render() {
    return (
      <div>
        Primary
      </div>
      );
  }
}\n;\n`

    var components = reacterminator({type: 'string', content: content})
    var ComponentAActual = _.find(components, {name: 'ComponentA'})
      .formattedFileSnippet

    assert.deepEqual(ComponentAActual, ComponentAExpected)
  })
})
