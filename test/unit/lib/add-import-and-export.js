/* eslint-env mocha */
const assert = require('chai').assert
const addImportAndExport = require('../../../lib/add-import-and-export')
const options = require('../../../lib/create-plugins-and-pipline')()

describe('add-import-and-export', function () {
  it('should not add import when there is no dependencies', function () {
    const component = {
      componentName: 'ComponentA',
      dependencies: [],
      declarationSnippet: `\
class ComponentA extends React.Component {
  render() {
    return <div></div>
  }
}\n`
    }

    assert.deepEqual(
      addImportAndExport({component, options}).fileSnippet,
      `\
import React from 'react';

class ComponentA extends React.Component {
  render() {
    return <div></div>
  }
}

export default ComponentA;\n`
    )
  })


  it('should add import and export', function () {
    const component = {
      componentName: 'ComponentA',
      dependencies: ['ComponentB'],
      declarationSnippet: `\
class ComponentA extends React.Component {
  render() {
    return <ComponentB></ComponentB>
  }
}\n`
    }

    assert.deepEqual(
      addImportAndExport({component, components: {}, options}).fileSnippet,
      `\
import React from 'react';
import ComponentB from './ComponentB';

class ComponentA extends React.Component {
  render() {
    return <ComponentB></ComponentB>
  }
}

export default ComponentA;\n`
    )
  })

  it('should import multiple components', function () {
    const component = {
      componentName: 'ComponentA',
      dependencies: ['ComponentB', 'ComponentC'],
      declarationSnippet: `\
class ComponentA extends React.Component {
  render() {
      return <div><ComponentB></ComponentB><ComponentC></ComponentC></div>
  }
}\n`
    }

    assert.deepEqual(
      addImportAndExport({component, components: {}, options}).fileSnippet,
      `\
import React from 'react';
import ComponentB from './ComponentB';
import ComponentC from './ComponentC';

class ComponentA extends React.Component {
  render() {
      return <div><ComponentB></ComponentB><ComponentC></ComponentC></div>
  }
}

export default ComponentA;\n`
    )
  })

  it('should add code from imports', function () {
    const component = {
      componentName: 'ComponentA',
      dependencies: [],
      declarationSnippet: '',
      imports: 'import {Router} from \'react-router\'; import _ from \'lodash\';'
    }

    assert.deepEqual(
      addImportAndExport({component, options}).fileSnippet,
      `\
import React from 'react';
import {Router} from 'react-router';
import _ from 'lodash';\n

export default ComponentA;\n`
    )
  })
})
