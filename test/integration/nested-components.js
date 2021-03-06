/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe('reacterminator', function () {
  it('should generate two nested components', function () {
    var content = `\
<div data-component-name="ComponentA">
  <div data-component-name="ComponentB">
  </div>
</div>`

    var ComponentA = `\
import React from 'react';
import ComponentB from './ComponentB';

class ComponentA extends React.Component {
  render() {
    return (
      <div> <ComponentB></ComponentB> </div>
      );
  }
};

export default ComponentA;\n`

    var ComponentB = `\
import React from 'react';

class ComponentB extends React.Component {
  render() {
    return (
      <div> </div>
      );
  }
};

export default ComponentB;\n`

    var components = reacterminator({type: 'string', content: content})

    assert.deepEqual(components.ComponentA.fileSnippet, ComponentA)
    assert.deepEqual(components.ComponentB.fileSnippet, ComponentB)
  })

  it('should generate three nested components', function () {
    var content = `\
<div data-component-name="ComponentA">
  <div data-component-name="ComponentB">
    <div data-component-name="ComponentC">
    </div>
  </div>
</div>`

    var ComponentA = `\
import React from 'react';
import ComponentB from './ComponentB';

class ComponentA extends React.Component {
  render() {
    return (
      <div> <ComponentB></ComponentB> </div>
      );
  }
};

export default ComponentA;\n`

    var ComponentB = `\
import React from 'react';
import ComponentC from './ComponentC';

class ComponentB extends React.Component {
  render() {
    return (
      <div> <ComponentC></ComponentC> </div>
      );
  }
};

export default ComponentB;\n`

    var ComponentC = `\
import React from 'react';

class ComponentC extends React.Component {
  render() {
    return (
      <div> </div>
      );
  }
};

export default ComponentC;\n`

    var components = reacterminator({type: 'string', content: content})

    assert.deepEqual(components.ComponentA.fileSnippet, ComponentA)
    assert.deepEqual(components.ComponentB.fileSnippet, ComponentB)
    assert.deepEqual(components.ComponentC.fileSnippet, ComponentC)
  })
})
