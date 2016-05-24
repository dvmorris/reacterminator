/* eslint-env mocha */
const fs = require('fs')
const shell = require('shelljs')
const assert = require('chai').assert
const reacterminator = require('../../lib/index')

describe('redux-integration', function () {
  beforeEach(function () {
    shell.exec('rm -rf ./reacterminator')
  })

  it('should hook redux into component and generate redux files', function () {
    reacterminator(
      {
        type: 'path',
        content: './examples/test/redux-example.html'
      },
      {
        fileToComponent: true,
        generateFiles: true
      }
    )

    // Assert component content
    const ReduxExampleActual = fs.readFileSync(
      './reacterminator/readonly-components/ReduxExample.jsx',
      'utf8'
    )

    const ReduxExampleExpected = `\
import React from 'react';
import { connect as reduxConnect } from 'react-redux';
import action from '../action-creators/readonly-index';

class ReduxExample extends React.Component {
  render() {
    return (
      <div>
        <form id="email-form" name="email-form" onSubmit={this.props['action.reduxExample.submitEmailForm']}>
          <input id="name"
            name="name"
            value={this.props['state.reduxExample.name']}
            onChange={this.props['action.reduxExample.changeName']} />
          <input id="phone-number"
            type="text"
            name="phone-number-login"
            value={this.props['state.reduxExample.phoneNumber']}
            onChange={this.props['action.reduxExample.changePhoneNumber']} />
          <button id="single-button" onClick={this.props['action.reduxExample.clickSingleButton']}>
          </button>
        </form>
      </div>
      );
  }
}
;
const ReduxExampleWithRedux = reduxConnect(
  (state) => ({
    'state.reduxExample.name': state.reduxExample.name,
    'state.reduxExample.phoneNumber': state.reduxExample.phoneNumber
  }),
  {
    'action.reduxExample.submitEmailForm': action.reduxExample.submitEmailForm,
    'action.reduxExample.changeName': action.reduxExample.changeName,
    'action.reduxExample.changePhoneNumber': action.reduxExample.changePhoneNumber,
    'action.reduxExample.clickSingleButton': action.reduxExample.clickSingleButton
  }
)(ReduxExample);

export default ReduxExampleWithRedux;
`

    assert.deepEqual(ReduxExampleActual, ReduxExampleExpected)

    const storeActual = fs.readFileSync(
      './reacterminator/store.js',
      'utf8'
    )

    const storeExpected = `\
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

export default createStore(reducers, applyMiddleware(thunk));
`

    assert.deepEqual(
      storeActual,
      storeExpected
    )

    // action-type-constants
    // action-creators
    // reducers
  })
})
